import { Pipe, PipeTransform } from '@angular/core';
import { humanize } from '@core/utils';

@Pipe({
  name: 'humanize',
  standalone: true,
})
export class HumanizePipe implements PipeTransform {
  transform(value: any, caseSplit = false): any {
    return humanize(value, caseSplit);
  }
}
