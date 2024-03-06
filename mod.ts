/**
 * A collection of functions for converting strings between different cases.
 *
 * This module provides functions for converting strings between camel case,
 * snake case, kebab case, title case, pascal case, and constant case. It also
 * provides a function for splitting a string into pieces based on spaces,
 * dashes, underscores, and camel case.
 *
 * All functions can be used with either a single string or an array of strings.
 * The single string will be split into pieces using the {@link splitPieces}
 * function.
 *
 * ```ts
 * import * as cases from "@luca/cases";
 *
 * cases.splitPieces("helloWorld") // ["hello", "world"]
 * cases.camelCase("hello world") // "helloWorld"
 * cases.snakeCase("helloWorld") // "hello_world"
 * cases.kebabCase("hello_world") // "hello-world"
 * cases.titleCase("hello-world") // "Hello World"
 * cases.pascalCase(["hello", "world"]) // "HelloWorld"
 * cases.constantCase("hello world") // "HELLO_WORLD"
 * ```
 * @module
 */

/**
 * Split a string into pieces based on spaces, dashes, underscores, and camel
 * case.
 *
 * ```ts
 * splitPieces("helloWorld") // ["hello", "world"]
 * splitPieces("hello-world") // ["hello", "world"]
 * splitPieces("hello_world") // ["hello", "world"]
 * splitPieces("hello world") // ["hello", "world"]
 * splitPieces("parseURL") // ["parse", "URL"]
 * splitPieces("parseURLFunction") // ["parse", "URL", "Function"]
 * ```
 *
 * @param str The string to split.
 * @returns The pieces of the string.
 */
export function splitPieces(str: string): string[] {
  const regexp =
    /[^\p{Lu}_\-\s]+|\p{Lu}+(?![^\p{Lu}_\-\s])|\p{Lu}[^\p{Lu}_\-\s]*/gu;
  return Array.from(str.matchAll(regexp), (m) => m[0]);
}

/**
 * Convert a string to camel case.
 *
 * If a given segment is already totally upper case, and not the first segment,
 * it will stay that way. All other segments will be converted to lower case,
 * with only the first letter being upper case.
 *
 * ```ts
 * camelCase("hello world") // "helloWorld"
 * camelCase("hello-world") // "helloWorld"
 * camelCase("hello_world") // "helloWorld"
 * camelCase("parse URL") // "parseURL"
 * camelCase(["hello", "world"]) // "helloWorld"
 * ```
 *
 * @param str The string to convert.
 * @returns The camel case string.
 */
export function camelCase(str: string | string[]): string {
  const pieces = Array.isArray(str) ? str : splitPieces(str);
  return pieces
    .map((s, i) => {
      if (i === 0) {
        return s.toLowerCase();
      } else if (s.toUpperCase() === s) {
        return s;
      } else {
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
      }
    })
    .join("");
}

/**
 * Convert a string to snake case.
 *
 * All segments will be converted to lower case, with underscores between each
 * segment.
 *
 * ```ts
 * snakeCase("hello world") // "hello_world"
 * snakeCase("helloWorld") // "hello_world"
 * snakeCase("hello-world") // "hello_world"
 * snakeCase("parse URL") // "parse_url"
 * snakeCase(["hello", "world"]) // "hello_world"
 * ```
 *
 * @param str The string to convert.
 * @returns The snake case string.
 */
export function snakeCase(str: string | string[]): string {
  const pieces = Array.isArray(str) ? str : splitPieces(str);
  return pieces.map((s) => s.toLowerCase()).join("_");
}

/**
 * Convert a string to kebab case.
 *
 * All segments will be converted to lower case, with dashes between each
 * segment.
 *
 * ```ts
 * kebabCase("hello world") // "hello-world"
 * kebabCase("helloWorld") // "hello-world"
 * kebabCase("hello_world") // "hello-world"
 * kebabCase("parse URL") // "parse-url"
 * kebabCase(["hello", "world"]) // "hello-world"
 * ```
 *
 * @param str The string to convert.
 * @returns The kebab case string.
 */
export function kebabCase(str: string | string[]): string {
  const pieces = Array.isArray(str) ? str : splitPieces(str);
  return pieces.map((s) => s.toLowerCase()).join("-");
}

/**
 * Convert a string to title case.
 *
 * If a given segment is already totally upper case, it will stay that way. All
 * other segments will be converted to lower case, with only the first letter
 * being upper case.
 *
 * ```ts
 * titleCase("hello world") // "Hello World"
 * titleCase("helloWorld") // "Hello World"
 * titleCase("hello-world") // "Hello World"
 * titleCase("parse URL") // "Parse URL"
 * titleCase(["hello", "world"]) // "Hello World"
 * ```
 *
 * @param str The string to convert.
 * @returns The title case string.
 */
export function titleCase(str: string | string[]): string {
  const pieces = Array.isArray(str) ? str : splitPieces(str);
  return pieces.map((s) => {
    if (s.toUpperCase() === s) {
      return s;
    } else {
      return s[0].toUpperCase() + s.slice(1).toLowerCase();
    }
  }).join(" ");
}

/**
 * Convert a string to pascal case.
 *
 * If a given segment is already totally upper case, it will stay that way. All
 * other segments will be converted to lower case, with only the first letter
 * being upper case.
 *
 * ```ts
 * pascalCase("hello world") // "HelloWorld"
 * pascalCase("helloWorld") // "HelloWorld"
 * pascalCase("hello-world") // "HelloWorld"
 * pascalCase("parse URL") // "ParseURL"
 * pascalCase(["hello", "world"]) // "HelloWorld"
 * ```
 *
 * @param str The string to convert.
 * @returns The pascal case string.
 */
export function pascalCase(str: string | string[]): string {
  const pieces = Array.isArray(str) ? str : splitPieces(str);
  return pieces.map((s) => {
    if (s.toUpperCase() === s) {
      return s;
    } else {
      return s[0].toUpperCase() + s.slice(1).toLowerCase();
    }
  }).join("");
}

/**
 * Convert a string to constant case.
 *
 * All segments will be converted to upper case, with underscores between each
 * segment.
 *
 * ```ts
 * constantCase("hello world") // "HELLO_WORLD"
 * constantCase("helloWorld") // "HELLO_WORLD"
 * constantCase("hello-world") // "HELLO_WORLD"
 * constantCase("parse URL") // "PARSE_URL"
 * constantCase(["hello", "world"]) // "HELLO_WORLD"
 * ```
 *
 * @param str The string to convert.
 * @returns The constant case string.
 */
export function constantCase(str: string | string[]): string {
  const pieces = Array.isArray(str) ? str : splitPieces(str);
  return pieces.map((s) => s.toUpperCase()).join("_");
}
