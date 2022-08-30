import yargs from "yargs";
import { DEFAULT_LENGTH } from "./constants.js";

interface Args {
  _: string[];
  length: number;
}

export function parseArgs(): Args {
  const yargsObject = yargs(process.argv.slice(2))
    .strict()
    .usage("usage: zampass [options]")
    .scriptName("zampass")

    .alias("h", "help") // By default, only "--help" is enabled
    .alias("V", "version") // By default, only "--version" is enabled

    .option("length", {
      alias: "l",
      default: DEFAULT_LENGTH,
      type: "number",
    })

    .parseSync();

  return yargsObject as Args;
}
