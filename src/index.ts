import chalk from "chalk";
import commander from "commander";
import fs from "fs-extra";
import os from "os";
import path from "path";

const createProjectDirectory = async (
  applicationName: string
): Promise<void> => {
  const root = path.resolve(applicationName);
  const originalDirectory = process.cwd();

  fs.ensureDirSync(root);

  console.log();
  console.log(`Creating a new React app in ${chalk.yellowBright(root)}.`);
  console.log();

  const packageJson = {
    name: applicationName,
    version: "0.0.0",
  };

  try {
    await fs.writeFile(
      path.join(root, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );

    console.log("Installing packages...");
  } catch (error) {
    console.error(error);
  }
};

const main = async (): Promise<void> => {
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
    console.error("\nPlease specify the name of your application:");
    console.log(
      `\t${chalk.cyan(program.name())} ${chalk.green("<application-name>")}\n`
    );
    console.log("For example:");
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green("my-cool-app")}\n`
    );
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  // TODO - Catch names like "my.app.name" or "my app name"

  await createProjectDirectory(applicationName);
};

export default main;
