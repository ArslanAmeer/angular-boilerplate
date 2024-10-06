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

/**
 * The function `MoveItemInArray` repositions an item within an array from a specified index to another
 * index.
 * @param {T[]} workArray - An array of type T that you want to manipulate.
 * @param {number} fromIndex - The `fromIndex` parameter represents the index of the item you want to
 * move within the array.
 * @param {number} toIndex - The `toIndex` parameter represents the index where you want to move the
 * item to in the array.
 * @returns The function `MoveItemInArray` returns the updated array after moving an item from one
 * index to another within the array.
 * @example MoveItemInArray([1, 2, 3, 4, 5], 1, 3) => [1, 3, 4, 2, 5]
 */
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

/**
 * The function `BeautifyArrayOfNumbers` takes an input, parses it into an array of numbers, and
 * returns the beautified array.
 * @param {any} input - The `BeautifyArrayOfNumbers` function takes an `input` parameter, which can be
 * either a string or an array. If the `input` is a string, the function attempts to parse it into an
 * array of numbers. If the `input` is already an array, it directly operates
 * @returns The `BeautifyArrayOfNumbers` function returns an array of numbers after processing the
 * input.
 * @example BeautifyArrayOfNumbers('1, 2, 3, 4, 5') => [1, 2, 3, 4, 5], BeautifyArrayOfNumbers([1, '2', 3, '4', 5]) => [1, 2, 3, 4, 5]
 */
export function BeautifyArrayOfNumbers(input: any): number[] {
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

/**
 * The function EnumToStringArray converts an enum object into an array of string values or keys based
 * on the specified parameter.
 * @param {T} enumObj - The `enumObj` parameter in the `EnumToStringArray` function is the enum object
 * that you want to convert to an array of strings.
 * @param [keyArray=false] - The `keyArray` parameter in the `EnumToStringArray` function is a boolean
 * flag that determines whether the function should return an array of enum keys or an array of enum
 * values. If `keyArray` is set to `true`, the function will return an array of enum keys. If `
 * @returns The function `EnumToStringArray` returns an array of string values from the provided enum
 * object. If the `keyArray` parameter is set to `true`, it returns an array of enum keys as strings.
 * If `keyArray` is set to `false` or not provided, it returns an array of enum values as strings.
 * @example EnumToStringArray({ A: 1, B: 2, C: 3 }) => ['A', 'B', 'C'], EnumToStringArray({ A: 1, B: 2, C: 3 }, true) => ['A', 'B', 'C']
 */
export function EnumToStringArray<T>(enumObj: T, keyArray = false): string[] {
  if (keyArray) {
    return Object.keys(enumObj).filter((key) => isNaN(Number(key)));
  } else {
    return Object.keys(enumObj)
      .filter((key) => isNaN(Number(key)))
      .map((key) => enumObj[key]);
  }
}

/**
 * The function EnumToKeyValueArray converts an enum object into an array of key-value pairs with
 * optional translation and key case splitting.
 * @param {T} enumObj - The `enumObj` parameter in the `EnumToKeyValueArray` function is expected to be
 * an enum object in TypeScript. It will be used to generate a key-value array where the keys are the
 * string representations of the enum keys and the values are the corresponding enum values.
 * @param {TranslateService} [translateService] - The `translateService` parameter is an optional
 * parameter of type `TranslateService`. It is used for translating the keys of the enum into
 * human-readable format before returning the key-value array. If provided, the
 * `translateService.instant()` method is used to translate the keys. If not provided, the keys are
 * returned as is.
 * @param [keyCaseSpilt=true] - The `keyCaseSpilt` parameter in the `EnumToKeyValueArray` function is a
 * boolean flag that determines whether the keys of the enum should be split based on casing. If
 * `keyCaseSpilt` is set to `true`, the keys will be split based on casing before being translated
 * @returns The function `EnumToKeyValueArray` returns an array of objects with `key` and `value`
 * properties. The `key` property is a string representing the key of the enum object, potentially
 * translated using a `TranslateService` if provided, and humanized if `keyCaseSpilt` is true. The
 * `value` property is the corresponding value of the enum object.
 * @example EnumToKeyValueArray({ A: 1, B: 2, C: 3 }) => [{ key: 'A', value: 1 }, { key: 'B', value: 2 }, { key: 'C', value: 3 }]
 */
export function EnumToKeyValueArray<T>(enumObj: T, translateService?: TranslateService, keyCaseSpilt = true): { key: string; value: string }[] {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({ key: translateService ? translateService.instant(humanize(key, keyCaseSpilt)) : humanize(key, keyCaseSpilt), value: enumObj[key] }));
}
