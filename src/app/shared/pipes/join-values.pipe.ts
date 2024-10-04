import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinValues',
  standalone: true,
})
/**
 * Pipe to join an array of values into a single string.
 * If the array contains objects, a propertyName can be provided to extract the value from each object.
 * If no propertyName is provided, the array is joined as is.
 * @example
 * <div>{{ ['a', 'b', 'c'] | joinValues }}</div> <!-- Output: 'a, b, c' -->
 *   <div>{{ [{ name: 'a' }, { name: 'b' }, { name: 'c' }] | joinValues: 'name' }}</div> <!-- Output: 'a, b, c' -->
 *     <div>{{ [{ name: 'a' }, { name: 'b' }, { name: 'c' }] | joinValues: 'name': '-' }}</div> <!-- Output: 'a-b-c' -->
 */
export class JoinValuesPipe implements PipeTransform {
  transform(value: any[], propertyName?: string, separator = ', '): string {
    if (!value || value.length === 0) {
      return '';
    }

    // Check if we're dealing with an array of objects and a propertyName is provided
    if (propertyName && value.every((item) => typeof item === 'object' && item !== null && propertyName in item)) {
      return value.map((item) => item[propertyName]).join(separator);
    }

    // Default case for arrays of strings or numbers
    return value.join(separator);
  }
}
