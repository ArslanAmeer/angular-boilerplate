/**
 *
 *  A function that moves an item in an array to a new position.
 *
 * @param workArray
 * @param fromIndex
 * @param toIndex
 */
import { humanize } from '@core/utils/humanize-slug.utility';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from '../services/misc/logger.service';

const log = new Logger('Array Utility');

export function MoveItemInArray<T>(workArray: T[], fromIndex: number, toIndex: number): T[] {
  if (toIndex === fromIndex) {
    return workArray;
  }
  const target = workArray[fromIndex];
  const increment = toIndex < fromIndex ? -1 : 1;

  for (let k = fromIndex; k !== toIndex; k += increment) {
    workArray[k] = workArray[k + increment];
  }
  workArray[toIndex] = target;
  return workArray;
}

export function BeautifyArrayOfNumbers(input: any): number[] | Array<number> {
  let array: any[];

  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input);
      // Ensure the parsed result is an array
      array = Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      log.error('Error parsing input string:', error);
      return [];
    }
  } else if (Array.isArray(input)) {
    array = input;
  } else {
    // If the input is neither an array nor a string, log an error
    log.error('Input is not an array or a string:', input);
    return [];
  }

  return array.map((item) => {
    if (typeof item === 'string') {
      try {
        // This handles stringifies numbers
        return Number(JSON.parse(item));
      } catch (error) {
        // If parsing fails, convert directly to Number
        return Number(item);
      }
    }
    return Number(item);
  });
}

export function EnumToStringArray<T>(enumObj: T, keyArray = false): string[] {
  if (keyArray) {
    return Object.keys(enumObj).filter((key) => isNaN(Number(key)));
  } else {
    return Object.keys(enumObj)
      .filter((key) => isNaN(Number(key)))
      .map((key) => enumObj[key]);
  }
}

export function EnumToKeyValueArray<T>(enumObj: T, translateService?: TranslateService, keyCaseSpilt = true): { key: string; value: string }[] {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({ key: translateService ? translateService.instant(humanize(key, keyCaseSpilt)) : humanize(key, keyCaseSpilt), value: enumObj[key] }));
}
