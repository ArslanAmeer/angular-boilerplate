/**
 * The `humanize` function takes a string and optionally splits it based on case or
 * specific characters, then capitalizes the first letter of each fragment and returns the humanized
 * string.
 * @param {string} str - The `str` parameter is a string that you want to humanize, meaning to format
 * it in a more readable and user-friendly way. This function takes a string as input and transforms it
 * into a human-readable format by capitalizing the first letter of each word and converting the rest
 * of the letters to
 * @param [caseSplit=false] - The `caseSplit` parameter in the `humanize` function determines whether
 * to insert a space before all capital letters in camelCase or PascalCase strings. If `caseSplit` is
 * set to `true`, the function will insert a space before each capital letter that is not the first
 * character in the
 * @returns The `humanize` function returns a human-readable version of the input string by
 * capitalizing the first letter of each word and converting the rest of the letters to lowercase. If
 * the `caseSplit` parameter is set to `true`, it also inserts a space before each capital letter in
 * camelCase or PascalCase strings.
 * @example humanize('helloWorld') => 'Hello World', humanize('helloWorld', true) => 'Hello World'
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

/**
 * The function `deHumanize` takes a string input, converts it to lowercase, replaces spaces with a
 * specified operator (default is underscore), and returns the modified string.
 * @param {string} str - The `str` parameter is a string that represents the text you want to
 * dehumanize. It will be converted to lowercase and have spaces replaced with the specified
 * `operator`.
 * @param [operator=_] - The `operator` parameter in the `deHumanize` function is used to specify the
 * character that will replace the spaces in the input string. By default, it is set to an underscore
 * ('_').
 * @returns The `deHumanize` function returns a string where all spaces in the input string have been
 * replaced with the specified `operator` (default is underscore) after converting the input string to
 * lowercase.
 * @example deHumanize('Hello World') => 'hello_world', deHumanize('Hello World', '-') => 'hello-world'
 */
export function deHumanize(str: string, operator = '_') {
  return str.toLowerCase().split(' ').join(operator);
}
