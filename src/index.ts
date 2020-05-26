import chalk from "chalk";
import commander from "commander";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn:
    "https://55c913cc3d394f71ba669fda095698fd@o202486.ingest.sentry.io/5254191",
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
    const program = new commander.Command("create-cli-application")
      .version("0.0.0")
      .arguments("<application-name>")
      .usage(`${chalk.yellowBright("<application-name>")} [options]`)
      .action((name) => {
        applicationName = name;
      })
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

    if (applicationName === "." || !applicationName) {
      return handleIncorrectApplicationName(program);
    }

    // TODO - Catch names like "my.app.name" or "my app name"

    await createProjectDirectory(applicationName);

    await installDependencies(applicationName);

    await installDevDependencies(applicationName);

    await copyTemplateFiles(applicationName);

    await createTSConfig(applicationName);

    displaySuccessMessage(applicationName);
  } catch (error) {
    // TODO - Cleanup
    console.error(error);
    throw new Error(error);
  }
};

export default main;
