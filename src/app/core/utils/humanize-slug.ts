/**
 * Function to humanize a slug
 * @param str {string}
 * @returns {string}
 */

export function humanize(str: string) {
  let i, frags = str.split('_');
  if(str.includes('-')) frags = str.split('-');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}

export function deHumanize(str: string, operator = '_') {
  return str.toLowerCase().split(' ').join(operator);
}
