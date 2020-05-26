import * as Sentry from "@sentry/node";
import chalk from "chalk";
import commander from "commander";
import inquirer from "inquirer";

Sentry.init({
  dsn:
    "https://55c913cc3d394f71ba669fda095698fd@o202486.ingest.sentry.io/5254191",
  release: "0.4.0",
});

import {
  copyTemplateFiles,
  createProjectDirectory,
  installDependencies,
  installDevDependencies,
  createTSConfig,
  displaySuccessMessage,
} from "./init";
import { handleIncorrectApplicationName } from "./program";

const main = async (): Promise<void> => {
  try {
    let applicationName;
    let language: "js" | "ts";
    language = "js";
    const program = new commander.Command("create-cli-application")
      .version("0.4.0")
      .arguments("<application-name>")
      .usage(`${chalk.yellowBright("<application-name>")} [options]`)
      .action((name) => {
        applicationName = name;
      })
      .option(
        "--typescript",
        "use TypeScript as the cli application source language",
        false
      )
      .option(
        "--interactive",
        "Have the bootstrapper walk you through the process",
        false
      )
      .on("--help", () => {
        console.log(
          `\nOnly ${chalk.yellowBright("<application-name>")} is required.`
        );
        console.log(`\nIf you run into a problem, please open up a new issue:`);
        console.log(
          `${chalk.cyan(
            "https://github.com/alexlee-dev/create-cli-application/issues/new"
          )}\n`
        );
      })
      .parse(process.argv);

    // TODO - Catch names like "my.app.name" or "my app name"
    if (applicationName === "." || !applicationName) {
      return handleIncorrectApplicationName(program);
    }

    if (program.interactive) {
      // * Interactive walk-thru
      // * Language
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "language",
          message: "Please select a source language:",
          choices: [
            { value: "js", name: "JavaScript" },
            { value: "ts", name: "TypeScript" },
          ],
        },
      ]);
      const languageChoice: "js" | "ts" = answers.language;
      language = languageChoice;

      // TODO - Compiler Choice (Babel vs. other)
      // TODO - Add Prettier
      // TODO - Add ESLint / Other Linter
      // TODO - Menu Color Option
    }
    if (program.typescript && !program.interactive) language = "ts";

    await createProjectDirectory(applicationName, language);

    await installDependencies(applicationName);

    await installDevDependencies(applicationName, language);

    await copyTemplateFiles(applicationName, language);

    if (language === "ts") await createTSConfig(applicationName);

    displaySuccessMessage(applicationName);
  } catch (error) {
    // TODO - Cleanup
    console.error(error);
    throw new Error(error);
  }
};

export default main;
