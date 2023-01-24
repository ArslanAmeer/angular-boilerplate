/**
 *
 *  A function that moves an item in an array to a new position.
 *
 * @param workArray
 * @param fromIndex
 * @param toIndex
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
