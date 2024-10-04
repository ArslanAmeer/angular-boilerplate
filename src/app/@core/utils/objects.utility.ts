/**
 * The function removes null, undefined, and empty properties from an object recursively,
 * except for the properties specified in the whitelist.
 * @param {any} object - The input object from which you want to remove null, undefined, and empty properties.
 * @param {string[]} [whitelist=[]] - An optional array of property names that should not be deleted if empty.
 * @returns An object with null, undefined, and empty properties removed, except for the properties in the whitelist.
 */
export function removeNullAndUndefinedProperties(object: any, whitelist: string[] = []): any {
  // Check if the input is null, undefined, or an empty string, return null for those cases
  if (object === null || object === undefined || object === '') {
    return null;
  }

  // Handle arrays: map over items, remove unwanted values, and filter out nulls after the transformation
  if (Array.isArray(object)) {
    return object.map((item) => removeNullAndUndefinedProperties(item, whitelist)).filter((item) => item !== null && item !== undefined && item !== '');
  }

  // For objects: create a new object, recursively remove unwanted values, and include properties that aren't null, undefined, or an empty string
  if (typeof object === 'object') {
    const result: any = {};
    for (const key of Object.keys(object)) {
      const value = removeNullAndUndefinedProperties(object[key], whitelist);
      if (whitelist.includes(key) || (value !== null && value !== undefined && value !== '')) {
        result[key] = value;
      }
    }
    return result;
  }

  // Return the object for non-object and non-array types that aren't null, undefined, or an empty string
  return object;
}

/**
 * Function to sort object keys
 * @param obj as Object
 * @returns Object
 */

export function sortObjectByKeys(obj: any) {
  return Object.keys(obj)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = obj[key];
      return accumulator;
    }, {});
}

/**
 * A function that takes an object and an array of properties to exclude and returns a new object
 *
 * @param object
 * @param excludeKeys
 * @returns new object without excluded keys
 */

export function OmitProperties(object: NonNullable<unknown>, excludeKeys: Set<string>): NonNullable<unknown> {
  const filteredPairs = Object.entries(object).filter(([key]) => !excludeKeys.has(key));
  return Object.fromEntries(filteredPairs);
}

/**
 * A function that takes an object and an array of properties to include and returns a new object
 *
 * @returns new object with only included keys
 * @param obj
 */
export function checkIfObjectIsEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0;
}
