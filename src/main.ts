#!/usr/bin/env node

import clipboardy from "clipboardy";
import sourceMapSupport from "source-map-support";
import { parseArgs } from "./parseArgs.js";
import { getRandomArrayElement, initArray, repeat } from "./util.js";

main();

function main() {
  sourceMapSupport.install();

  const args = parseArgs();
  const password = getPassword(args.length);
  clipboardy.writeSync(password);
  console.log("Generated a password and stored it in the clipboard.");
}

function getPassword(length: number): string {
  const validCharacters = getValidCharacters();

  let password = "";
  repeat(length, () => {
    const randomCharacter = getRandomArrayElement(validCharacters);
    password += randomCharacter;
  });

  return password;
}

function getValidCharacters(): string[] {
  const lowercaseLetters = getCharactersBetween("a", "z");
  const uppercaseLetters = getCharactersBetween("A", "Z");
  const numbers = getCharactersBetween("0", "9");

  return [...lowercaseLetters, ...uppercaseLetters, ...numbers];
}

function getCharactersBetween(
  firstCharacter: string,
  lastCharacter: string,
): string[] {
  const firstCharacterCode = firstCharacter.charCodeAt(0);
  const lastCharacterCode = lastCharacter.charCodeAt(0);
  const arrayLength = lastCharacterCode - firstCharacterCode;
  const firstCharacterCodes = initArray(arrayLength, firstCharacterCode);
  const characterCodes = firstCharacterCodes.map(
    (_element, i) => firstCharacterCode + i,
  );

  return characterCodes.map((element) => String.fromCharCode(element));
}
