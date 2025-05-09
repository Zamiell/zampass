import { Command, Option } from "clipanion";
import clipboardy from "clipboardy";
import { getRandomArrayElement, newArray, repeat } from "complete-common";
import { isNumber } from "typanion";

const DEFAULT_PASSWORD_LENGTH = 128;

export class GetPasswordCommand extends Command {
  length = Option.String("-l,--length", DEFAULT_PASSWORD_LENGTH.toString(), {
    validator: isNumber(),
    description: "The length of the password.",
  });

  async execute(): Promise<void> {
    const password = getPassword(this.length);
    await clipboardy.write(password);
    console.log(
      `Generated a password of length ${password.length} and stored it in the clipboard.`,
    );
  }
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
