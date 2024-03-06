import {
  camelCase,
  constantCase,
  kebabCase,
  pascalCase,
  snakeCase,
  splitPieces,
  titleCase,
} from "./mod.ts";
import { assertEquals } from "@std/assert";

Deno.test("splitPieces", () => {
  assertEquals(splitPieces("a b c"), ["a", "b", "c"]);
  assertEquals(splitPieces("alphaBetaGamma"), ["alpha", "Beta", "Gamma"]);
  assertEquals(splitPieces("alpha_beta_gamma"), ["alpha", "beta", "gamma"]);
  assertEquals(splitPieces("alpha-beta-gamma"), ["alpha", "beta", "gamma"]);
  assertEquals(splitPieces("parseURL"), ["parse", "URL"]);
  assertEquals(splitPieces("parseURLFunction"), ["parse", "URL", "Function"]);
  assertEquals(splitPieces("parse__beta"), ["parse", "beta"]);
});

Deno.test("camelCase", () => {
  assertEquals(camelCase("hello world"), "helloWorld");
  assertEquals(camelCase("hello-world"), "helloWorld");
  assertEquals(camelCase("hello_world"), "helloWorld");
  assertEquals(camelCase("parse URL Function"), "parseURLFunction");
  assertEquals(camelCase(["hello", "world"]), "helloWorld");
});

Deno.test("snakeCase", () => {
  assertEquals(snakeCase("hello world"), "hello_world");
  assertEquals(snakeCase("helloWorld"), "hello_world");
  assertEquals(snakeCase("hello-world"), "hello_world");
  assertEquals(snakeCase("parse URL Function"), "parse_url_function");
  assertEquals(snakeCase(["hello", "world"]), "hello_world");
});

Deno.test("kebabCase", () => {
  assertEquals(kebabCase("hello world"), "hello-world");
  assertEquals(kebabCase("helloWorld"), "hello-world");
  assertEquals(kebabCase("hello_world"), "hello-world");
  assertEquals(kebabCase("parse URL Function"), "parse-url-function");
  assertEquals(kebabCase(["hello", "world"]), "hello-world");
});

Deno.test("titleCase", () => {
  assertEquals(titleCase("hello world"), "Hello World");
  assertEquals(titleCase("helloWorld"), "Hello World");
  assertEquals(titleCase("hello_world"), "Hello World");
  assertEquals(titleCase("parse URL Function"), "Parse URL Function");
  assertEquals(titleCase(["hello", "world"]), "Hello World");
});

Deno.test("pascalCase", () => {
  assertEquals(pascalCase("hello world"), "HelloWorld");
  assertEquals(pascalCase("helloWorld"), "HelloWorld");
  assertEquals(pascalCase("hello-world"), "HelloWorld");
  assertEquals(pascalCase("parse URL Function"), "ParseURLFunction");
  assertEquals(pascalCase(["hello", "world"]), "HelloWorld");
});

Deno.test("constantCase", () => {
  assertEquals(constantCase("hello world"), "HELLO_WORLD");
  assertEquals(constantCase("helloWorld"), "HELLO_WORLD");
  assertEquals(constantCase("hello-world"), "HELLO_WORLD");
  assertEquals(constantCase("parse URL Function"), "PARSE_URL_FUNCTION");
  assertEquals(constantCase(["hello", "world"]), "HELLO_WORLD");
});
