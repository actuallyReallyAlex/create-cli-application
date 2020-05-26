import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import os from "os";
import path from "path";

import { dependencies, devDependencies } from "./constants";
import { executeCommand } from "./util";

export const createProjectDirectory = async (
  applicationName: string
): Promise<void> => {
  const root = path.resolve(applicationName);
  // const originalDirectory = process.cwd();

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
    spinner.start("Creating Application directory and package.json");
    await fs.writeFile(
      path.join(root, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );
    spinner.succeed(
      "Application Directory and package.json created successfully"
    );
  } catch (error) {
    spinner.fail(error);
    console.error(error);
  }
};

export const installDependencies = async (
  applicationName: string
): Promise<void> => {
  const root = path.resolve(applicationName);

  let spinner = ora();

  try {
    spinner.start("Installing dependencies");
    const installCommand = "npm";
    let installArgs = ["install", "--save"];
    installArgs = installArgs.concat(dependencies);
    await executeCommand(installCommand, installArgs, { cwd: root });
    spinner.succeed("Dependencies installed successfully");
  } catch (error) {
    spinner.fail(error);
    console.error(error);
  }
};

export const installDevDependencies = async (
  applicationName: string
): Promise<void> => {
  const root = path.resolve(applicationName);

  let spinner = ora();

  try {
    spinner.start("Installing devDependencies");
    const installCommand = "npm";
    let installArgs = ["install", "--save"];
    installArgs = installArgs.concat(devDependencies);
    await executeCommand(installCommand, installArgs, { cwd: root });
    spinner.succeed("DevDependencies installed successfully");
  } catch (error) {
    spinner.fail(error);
    console.error(error);
  }
};

export const copyTemplateFiles = async (
  applicationName: string
): Promise<void> => {
  const root = path.resolve(applicationName);

  let spinner = ora();

  try {
    await fs.copy(
      path.join(__dirname, "template/ts/src"),
      path.join(root, "/src")
    );
    spinner.succeed("Template files copied successfully");
  } catch (error) {
    spinner.fail(error);
    console.error(error);
  }
};

export const createTSConfig = async (
  applicationName: string
): Promise<void> => {
  const root = path.resolve(applicationName);

  let spinner = ora();

  const tsConfig = {
    compilerOptions: {
      target: "es5",
      module: "commonjs",
      outDir: "./build",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ["./src/**/*"],
  };

  try {
    spinner.start("Creating tsconfig.json");
    await fs.writeFile(
      path.join(root, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2) + os.EOL
    );
    spinner.succeed("tsconfig.json created successfully");
  } catch (error) {
    spinner.fail(error);
    console.error(error);
  }
};
