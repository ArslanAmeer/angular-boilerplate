import { TranslateService } from '@ngx-translate/core';

export class DateTimeUtility {
  /**
   * The function `getYears` returns an array of numbers representing the years between a start year and
   * an end year.
   * @param {number} startYear - The start year is the first year in the range of years you want to
   * generate.
   * @param {number} endYear - The `endYear` parameter represents the last year in the range of years you
   * want to generate.
   * @returns an array of numbers representing the years between the startYear and endYear (inclusive).
   */
  static getYears(startYear: number, endYear: number): number[] {
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  }

  /**
   * The function `getMonths` returns an array of objects containing the names and numbers of the months,
   * with the option to use language-specific month names if available.
   * @returns The function `getMonths()` returns an array of objects, where each object represents a
   * month. Each object has two properties: `name` and `number`. The `name` property represents the name
   * of the month, and the `number` property represents the number of the month (1 for January, 2 for
   * February, and so on).
   */
  static getMonths(translateService?: TranslateService): { name: string; number: number }[] {
    const months = [
      {
        name: translateService ? translateService.instant('calendar.' + 'all') : 'All',
        number: 0,
      },
    ];
    for (let i = 0; i < 12; i++) {
      const name = new Date(0, i).toLocaleString('en', { month: 'long' });
      const txName = translateService ? translateService.instant('calendar.' + name.toLowerCase()) : name;
      months.push({
        name: txName,
        number: i + 1,
      });
    }
    return months;
  }

  /**
   * The function `getDays` returns an array of numbers representing the days of a given month and year,
   * with the current day marked as "Current".
   * @param translateService - The `translateService` parameter is an instance of the TranslateService required to translate the day names.
   * @param {number} [month] - The `month` parameter is an optional number that represents the month. If
   * not provided, it defaults to the current month.
   * @param {number} [year] - The `year` parameter is an optional number that represents the year for
   * which you want to get the days. If no value is provided, it defaults to the current year.
   * @param keyValue - The `keyValue` parameter is an optional boolean that determines whether the array returned is number or key value pair.
   * @returns an array of numbers or strings representing the days of the specified month and year.
   */
  static getDays(translateService: TranslateService, month?: number, year?: number, keyValue = true): (number | string | { name: string; number: number })[] {
    const now = new Date();
    month = month ?? now.getMonth(); // 0-indexed
    year = year ?? now.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray: (number | string | { name: string; number: number })[] = [
      {
        name: translateService ? translateService.instant('calendar.' + 'all') : 'All',
        number: 0,
      },
    ];

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === now.getDate() && month === now.getMonth() && year === now.getFullYear();

      if (keyValue) {
        const dayObj = {
          name: isToday ? translateService.instant('calendar.' + 'current') : i.toString().toLowerCase(),
          number: i,
        };
        daysArray.push(dayObj);
      } else {
        if (isToday) {
          daysArray.push(translateService.instant('calendar.' + 'current'));
        } else {
          daysArray.push(i);
        }
      }
    }
    return daysArray;
  }

  /**
   * The function `getWeekDays` returns an array of objects containing the names and numbers of the days
   * @param translateService
   */
  static getWeekDays(translateService: TranslateService): { name: string; number: number }[] {
    const daysArray: { name: string; number: number }[] = [];
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    for (let i = 0; i < days.length; i++) {
      const dayObj = {
        name: translateService.instant('calendar.' + days[i]),
        number: i,
      };
      daysArray.push(dayObj);
    }
    return daysArray;
  }

  /**
   * The function `getDay` returns the day of the month for a given date.
   * @param date
   * @param translateService
   */
  static getDay(date: string, translateService?: TranslateService): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    if (translateService) {
      return translateService.instant('calendar.' + day.toString().toLowerCase());
    }
    return `${day}`;
  }

  /**
   * The function `getMonth` returns the month name for a given date.
   * @param date
   * @param translateService
   */
  static getMonth(date: string, translateService?: TranslateService): string {
    const dateObj = new Date(date);
    const month = dateObj.getMonth();
    const monthName = new Date(0, month).toLocaleString('en', { month: 'long' });
    if (translateService) {
      return translateService.instant('calendar.' + monthName.toLowerCase());
    }
    return monthName;
  }

  /**
   * The function `getMonthNumber` returns the month number for a given date.
   * @param date
   */
  static getMonthNumber(date: string): number {
    const dateObj = new Date(date);
    return dateObj.getMonth() + 1;
  }

  /**
   * The function `getDateOnly` returns the date part of a given date string.
   * @param date
   */
  static getDateOnly(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  }

  /**
   * The function `getRemainingTime` returns the remaining time between the current time and a given end date.
   * @param endDateStr
   * @param translateService
   */
  static getRemainingTime(endDateStr: string, translateService?: TranslateService): string {
    const endDate = new Date(endDateStr);
    const currentTime = new Date();
    const remainingTime = endDate.getTime() - currentTime.getTime();

    if (remainingTime <= 0) {
      // Assuming 'Expired' or its equivalent is also defined within your translations
      return translateService ? translateService.instant('dates&filters.expired') : 'Expired';
    }

    // Helper function to translate labels
    const translateLabel = (label: string, count: number): string => {
      if (translateService) {
        const translationKey = `dates&filters.${label}${count === 1 ? '' : 's'}`; // Adjusted to match your object structure
        return `${count} ${translateService.instant(translationKey)}`;
      } else {
        return `${count} ${label}${count === 1 ? '' : 's'}`;
      }
    };

    const millisecondsPerMinute = 1000 * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerMonth = millisecondsPerDay * 30;
    const millisecondsPerYear = millisecondsPerDay * 365;

    const years = Math.floor(remainingTime / millisecondsPerYear);
    if (years > 0) {
      return translateLabel('year', years);
    }

    const months = Math.floor(remainingTime / millisecondsPerMonth);
    if (months > 0) {
      return translateLabel('month', months);
    }

    const days = Math.floor(remainingTime / millisecondsPerDay);
    if (days > 0) {
      return translateLabel('day', days);
    }

    const hours = Math.floor(remainingTime / millisecondsPerHour);
    if (hours > 0) {
      return translateLabel('hour', hours);
    }

    const minutes = Math.floor(remainingTime / millisecondsPerMinute);
    return translateLabel('minute', minutes);
  }

  /**
   * The function `getTimeAgo` returns a string indicating the time elapsed since a given date.
   * @param date
   * @param translateService
   */
  static getTimeAgo(date: string, translateService?: TranslateService): string {
    const createdAtDate = new Date(date);
    const now = new Date();

    // Calculate the difference in milliseconds
    const differenceMs = now.getTime() - createdAtDate.getTime();

    // Check if the timestamp is in the future
    if (differenceMs < 0) {
      return translateService ? translateService.instant('in the future') : 'in the future';
    }

    // Calculate the difference in minutes
    const differenceMinutes = Math.round(differenceMs / (1000 * 60));

    // Helper function to translate time units
    const translate = (key: string, value: string | number) => (translateService ? `${translateService.instant(key, { value })}` : `${value} ${key}`);

    // Return a string indicating the time elapsed
    if (differenceMinutes < 1) {
      return translate('just now', '');
    } else if (differenceMinutes < 60) {
      return translate('m ago', differenceMinutes);
    } else if (differenceMinutes < 1440) {
      const hours = Math.floor(differenceMinutes / 60);
      return translate('h ago', hours);
    } else if (differenceMinutes < 10080) {
      const days = Math.floor(differenceMinutes / 1440);
      return translate('d ago', days);
    } else if (differenceMinutes < 43800) {
      const weeks = Math.floor(differenceMinutes / 10080);
      return translate('w ago', weeks);
    } else {
      const months = Math.floor(differenceMinutes / 43800);
      return translate('mo ago', months);
    }
  }

  /**
   * Converts a date string to a UTC Date object at midnight.
   * @param {string} dateStr - The date string to convert.
   * @returns {Date} - A Date object representing midnight UTC of the given date.
   */
  static formatDateToUTC(dateStr: string): Date {
    const date = new Date(dateStr);
    date.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero in UTC.
    return date;
  }

  /**
   * Converts a date object to a UTC string in the format 'YYYYMMDDTHHMMSSZ'.
   * @param {string} dateStr
   * @returns {string}
   */
  static formatDateToUTCString(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00Z'); // Append time part to ensure it's interpreted as UTC
    return date.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'; // Formats as YYYYMMDDTHHMMSSZ
  }

  /**
   * The function `isDateToday` checks if a given date string represents today's date.
   * @param {string} date - The `date` parameter in the `isDateToday` function is a string representing
   * a date in a specific format. The function compares this date with the current date to determine if
   * it is today's date.
   * @returns A boolean value indicating whether the input date string represents today's date or not.
   */
  static isDateToday(date: string): boolean {
    const today = new Date();
    const dateObj = new Date(date);
    return today.toDateString() === dateObj.toDateString();
  }
}
