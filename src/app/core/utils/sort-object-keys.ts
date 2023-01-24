/**
 * Function to sort object keys
 * @param obj as Object
 * @returns Object
 */

export function sortObjectByKeys(obj:any) {
  return Object.keys(obj)
    .sort()
    .reduce((accumulator, key) => {
      // @ts-ignore
      accumulator[key] = obj[key];
      return accumulator;
    }, {});
}
