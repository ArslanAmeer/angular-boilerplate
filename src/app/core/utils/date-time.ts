/**
 * These utility functions are used to convert date and time to the format required
 */

function diff_to_GMT(dt: any) {
  return (-dt.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(dt.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(dt.getTimezoneOffset() / 60)) + ':00';
}

export function DateTime(input: any) {
  const dt = input;
  const format = (new Date(new Date(dt!).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]);
  return (format.concat(diff_to_GMT(dt)).toString());
}

//Date of Birth Formatter //
export function GetDate(str: any) {
  const date = new Date(str),
    month = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join('-');
}

//Year Formatter //
export function YearFormatter(str: string) {
  const date = new Date(str);
  return date.getFullYear();
}

//Converting DateTime From Backend to Front End
export function BackendTimeFormatter(input: string) {
  return new Date(input);
}

//Time Clock using currentTime and Backend Time
export function CalculateTimeDifference(time1: number, time2: number) {

  const res = Math.abs(time1 - time2) / 1000;
  // get hours
  const hours = Math.floor(res / 3600) % 24;
  // get minutes
  const minutes = Math.floor(res / 60) % 60;
  // get seconds
  const seconds = res % 60;
  return hours + 'h ' + minutes + 'm ' + Math.trunc(seconds) + 's';
}

//Decimal Hours to Minutes
export function DecimalHoursToMinute(time: any) {
  const decimalTimeString = time.toString();
  const date = new Date(0, 0);
  date.setMinutes(+decimalTimeString * 60);
  return date.toTimeString().slice(0, 5);
}

export function CompareTime(time1: string, time2: string){
  return +new Date(time1) < +new Date(time2);
}

//Date Ago Formatter
export function DateAgoTransformer(time: any) {
  if (time) {
    const seconds = Math.floor((+new Date() - +new Date(time)) / 1000);
    if (seconds < 29)
      return 'Just now';
    const intervals = {
      'year': 31536000,
      'month': 2592000,
      'week': 604800,
      'day': 86400,
      'hr': 3600,
      'min': 60,
      'second': 1
    };
    let counter;
    for (const i in intervals) {
      // @ts-ignore
      counter = Math.floor(seconds / intervals[i]);
      if (counter > 0)
        if (counter === 1) {
          return counter + ' ' + i + ' ago';
        } else {
          return counter + ' ' + i + 's ago';
        }
    }
  }
  return time;
}
