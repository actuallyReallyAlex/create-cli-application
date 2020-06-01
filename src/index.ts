import * as Sentry from "@sentry/node";
import chalk from "chalk";
import commander from "commander";
import inquirer from "inquirer";
import updateNotifier from "update-notifier";
import pkg from "../package.json";

/**
 * Initialize Sentry
 */
Sentry.init({
  dsn:
    "https://55c913cc3d394f71ba669fda095698fd@o202486.ingest.sentry.io/5254191",
  release: "0.7.0",
});

import {
  copyTemplateFiles,
  createProjectDirectory,
  installDependencies,
  installDevDependencies,
  createTSConfig,
  displaySuccessMessage,
  replaceTemplateValues,
} from "./init";
import { handleIncorrectApplicationName } from "./program";
import {
  cleanupError,
  validateApplicationName,
  verifyNodeVersion,
} from "./util";

/**
 * Main CLI Program
 */
const main = async (): Promise<void> => {
  let applicationName;
  let authorName = "YOUR NAME";

  try {
    // * Used to set the directory, application name, and inserted into templates
    let language: "js" | "ts";
    // * Default language is JavaScript
    language = "js";

    /**
     * The program that parses the initial user input
     */
    const program = new commander.Command("create-cli-application")
      .version("0.7.0")
      .arguments("<application-name>")
      .usage(`${chalk.blueBright("<application-name>")} [options]`)
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
          `\nOnly ${chalk.blueBright("<application-name>")} is required.`
        );
        console.log(`\nIf you run into a problem, please open up a new issue:`);
        console.log(
          `${chalk.blueBright(
            "https://github.com/alexlee-dev/create-cli-application/issues/new"
          )}\n`
        );
      })
      .parse(process.argv);

    // * Very Node Version (>=10.0.0)
    verifyNodeVersion();

    // * Application Name must exist, and not consist of illegal characters
    validateApplicationName(applicationName);
    if (!applicationName) return;

    if (program.interactive) {
      // * Interactive walk-thru

      // * Language
      const languageAnswer = await inquirer.prompt([
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
      const languageChoice: "js" | "ts" = languageAnswer.language;
      language = languageChoice;

      // * Author Name
      const nameAnswer = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message:
            "Please input your name (used for the 'About' screen, but not required):",
        },
      ]);
      const name: string = nameAnswer.name;
      authorName = name;

      // TODO - Compiler Choice (Babel vs. other)
      // TODO - Add Prettier
      // TODO - Add ESLint / Other Linter
      // TODO - Menu Color Option
    }

    // * Set language to 'ts' if user passed --typescript flag
    if (program.typescript && !program.interactive) language = "ts";

    // * Creates a project directory and package.json
    await createProjectDirectory(applicationName, language);

    // * Installs dependencies
    await installDependencies(applicationName);

    // * Installs dev dependencies
    await installDevDependencies(applicationName, language);

    // * Copies template files
    await copyTemplateFiles(applicationName, language);

    // * Replaces template files placeholder values with real values for the application.
    await replaceTemplateValues(applicationName, language, authorName);

    // * Creates a tsconfig.json file
    if (language === "ts") await createTSConfig(applicationName);

    // * Displays a success message to the user
    displaySuccessMessage(applicationName);

    updateNotifier({
      pkg: {
        name: "create-cli-application",
        version: pkg.version,
      },
    }).notify();
  } catch (error) {
    await cleanupError(applicationName);
    console.error(error);
    throw new Error(error);
  }
};

export default main;
