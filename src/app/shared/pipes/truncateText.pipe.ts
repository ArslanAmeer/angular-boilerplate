import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

/**
 * **Truncate text Pipe**
 * @description Truncate text to a specified length, default is 100 characters, and add an ellipsis at the end.
 * @param value: string
 * @param limit: number
 * @param completeWords: boolean
 * @param ellipsis: string
 * @returns string
 * @example
 * {{ 'This is a long text' | truncateText: 10: true: '...' }}
 */
@Pipe({
  name: 'truncateText',
  standalone: true,
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, limit = 100, completeWords = false, ellipsis = '...'): SafeHtml {
    if (!value) {
      return '';
    }
    let truncatedText = value;
    if (completeWords) {
      limit = value.substring(0, limit).lastIndexOf(' ');
    }
    truncatedText = value.length > limit ? value.substring(0, limit) + ellipsis : value;
    return truncatedText;
  }
}
