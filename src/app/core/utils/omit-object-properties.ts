/**
 * A function that takes an object and an array of properties to exclude and returns a new object
 *
 * @param object
 * @param excludeKeys
 * @returns new object without excluded keys
 */

export function OmitProperties(object: Object, excludeKeys: Set<string>): Object {
  const filteredPairs = Object.entries(object).filter(([key]) => !excludeKeys.has(key));
  return Object.fromEntries(filteredPairs);
}
