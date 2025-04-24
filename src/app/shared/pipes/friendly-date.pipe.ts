import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'friendlyDate',
  standalone: true,
})
export class FriendlyDatePipe implements PipeTransform {
  constructor(private readonly _translateService: TranslateService) {}

  transform(value: Date | string, forceYear = false): string {
    if (!value) return '-';

    if (typeof value === 'string') {
      value = new Date(value);
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (this._isSameDate(value, today)) {
      return `${this._translateService.instant('Today')}, ${this._getFormattedDate(value)}`;
    } else if (this._isSameDate(value, yesterday)) {
      return `${this._translateService.instant('yesterday')}, ${this._getFormattedDate(value)}`;
    } else {
      if (value.getFullYear() === today.getFullYear() && value.getMonth() === today.getMonth()) {
        return this._getFormattedDate(value, forceYear);
      } else {
        return this._getFormattedDate(value, true);
      }
    }
  }

  private _isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
  }

  private _getFormattedDate(date: Date, includeYear = false): string {
    const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = this._translateService.instant(monthNamesShort[monthIndex]);
    const year = includeYear ? date.getFullYear() : '';

    return `${day} ${month}${includeYear ? ', ' + year : ''}`;
  }
}
