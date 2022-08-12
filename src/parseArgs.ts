import yargs from "yargs";
import { DEFAULT_LENGTH } from "./constants.js";

export interface Args {
  _: string[];
  length: number;
}

export function parseArgs(): Args {
  const yargsObject = yargs(process.argv.slice(2))
    .strict()
    .usage("usage: zampass [options]")
    .scriptName("zampass")

    .alias("h", "help") // By default, only "--help" is enabled
    .alias("v", "version") // By default, only "--version" is enabled

    .number("length")
    .alias("l", "length")
    .default("length", DEFAULT_LENGTH)

    .parseSync();

  return yargsObject as Args;
}
