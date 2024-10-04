/**
 * Function to humanize a slug
 * @param str
 * @param caseSplit - Insert a space before all caps in camelCase or PascalCase strings (default: false)
 * @returns {string}
 */

export function humanize(str: string, caseSplit = false): string {
  if (!str) return str;

  if (caseSplit) {
    // Insert a space before all caps in camelCase or PascalCase strings, avoid the first character
    str = str.replace(/(.)([A-Z])/g, '$1 $2');
  }

  // Determine the split pattern based on the existence of certain characters
  let frags;
  if (str.includes('_')) {
    frags = str.split('_');
  } else if (str.includes('-')) {
    frags = str.split('-');
  } else {
    frags = str.split(' ');
  }

  for (let i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase();
  }

  return frags.join(' ');
}

export function deHumanize(str: string, operator = '_') {
  return str.toLowerCase().split(' ').join(operator);
}
