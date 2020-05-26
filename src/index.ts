import chalk from "chalk";
import { spawn } from "child_process";
import commander from "commander";
import fs from "fs-extra";
import ora from "ora";
import os from "os";
import path from "path";

const executeCommand = async (
  command: string,
  args?: string[],
  options?: { cwd?: string }
): Promise<void | { code: number; signal: any }> =>
  new Promise((resolve, reject) => {
    const cp = spawn(command, args, options);
    cp.on("error", (err: Error) => {
      if (err) {
        reject(err.message);
      }
    });
    cp.on("exit", (code: number | null, signal) => {
      if (code !== 0) {
        reject({ code, signal });
      }
      resolve();
    });
    cp.on("message", (message) => {
      console.log({ message });
    });
  });

const createProjectDirectory = async (
  applicationName: string
): Promise<void> => {
  const root = path.resolve(applicationName);
  const originalDirectory = process.cwd();

  fs.ensureDirSync(root);

  console.log();
  console.log(`Creating a new React app in ${chalk.yellowBright(root)}.`);
  console.log();

  // TODO - Interactive mode to fill in some of these values

  const packageJson = {
    name: applicationName,
    version: "0.0.0",
    description: "A CLI application bootstrapped with create-cli-application.",
    main: "index.js",
    bin: {
      [applicationName]: "./index.js",
    },
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
    },
    keywords: [],
    author: "",
    license: "",
  };

  let spinner = ora();

  try {
    await fs.writeFile(
      path.join(root, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );

    spinner.start("Installing dependencies");

    const dependencies = [
      "boxen",
      "chalk",
      "clear",
      "configstore",
      "inquirer",
      "pickitt",
    ];

    const devDependencies = [
      "@types/clear",
      "@types/configstore",
      "@types/inquirer",
      "@types/node",
      "rimraf",
      "typescript",
    ];

    const installCommand = "npm";

    let installArgs = ["install", "--save"];
    installArgs = installArgs.concat(dependencies);
    await executeCommand(installCommand, installArgs, { cwd: root });
    spinner.succeed("Dependencies installed successfully");

    installArgs = ["install", "--save-dev"];
    installArgs = installArgs.concat(devDependencies);
    spinner.start("Installing devDependencies");
    await executeCommand(installCommand, installArgs, { cwd: root });
    spinner.succeed("DevDependencies installed successfully");
  } catch (error) {
    spinner.fail(error);
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
