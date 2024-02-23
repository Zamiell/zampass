#!/usr/bin/env node

import clipboardy from "clipboardy";
import { parseArgs } from "./parseArgs.js";
import { getRandomArrayElement, newArray, repeat } from "isaacscript-common-ts";

main();

function main() {
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

function getValidCharacters(): readonly string[] {
  const lowercaseLetters = getCharactersBetween("a", "z");
  const uppercaseLetters = getCharactersBetween("A", "Z");
  const numbers = getCharactersBetween("0", "9");

  return [...lowercaseLetters, ...uppercaseLetters, ...numbers];
}

function getCharactersBetween(
  firstCharacter: string,
  lastCharacter: string,
): readonly string[] {
  const firstCharacterCode = firstCharacter.codePointAt(0);
  const lastCharacterCode = lastCharacter.codePointAt(0);

  if (firstCharacterCode === undefined || lastCharacterCode === undefined) {
    return [];
  }

  const arrayLength = lastCharacterCode - firstCharacterCode;
  const firstCharacterCodes = newArray(arrayLength, firstCharacterCode);
  const characterCodes = firstCharacterCodes.map(
    (_element, i) => firstCharacterCode + i,
  );

  return characterCodes.map((element) => String.fromCodePoint(element));
}
