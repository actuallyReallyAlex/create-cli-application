import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import os from "os";
import path from "path";

import { dependencies, devDependencies, devDependenciesTS } from "./constants";
import { executeCommand } from "./util";

export const createProjectDirectory = async (
  applicationName: string,
  language: "js" | "ts"
): Promise<void> => {
  const root = path.resolve(applicationName);

  fs.ensureDirSync(root);

  console.log();
  console.log(`Creating a new CLI app in ${chalk.yellowBright(root)}.`);
  console.log();
  console.log(
    `Source Language: ${
      language === "js"
        ? chalk.yellowBright("JavaScript")
        : chalk.yellowBright("TypeScript")
    }`
  );
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
      build: language === "ts" ? "rimraf build && tsc" : "babel src -d build",
      start: "node build/index.js -- start",
      test: 'echo "Error: no test specified" && exit 1',
    },
    keywords: [],
    author: "",
    license: "",
  };

  let spinner = ora("Creating Application directory and package.json");

  try {
    spinner.start();
    await fs.writeFile(
      path.join(root, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );
    spinner.succeed(
      "Application Directory and package.json created successfully"
    );
  } catch (error) {
    spinner.fail();
    throw new Error(error);
  }
};

export const installDependencies = async (
  applicationName: string
): Promise<void> => {
  const root = path.resolve(applicationName);

  let spinner = ora("Installing dependencies");

  try {
    spinner.start();
    const installCommand = "npm";
    let installArgs = ["install", "--save"];
    installArgs = installArgs.concat(dependencies);
    await executeCommand(installCommand, installArgs, { cwd: root });
    spinner.succeed("Dependencies installed successfully");
  } catch (error) {
    spinner.fail();
    throw new Error(error);
  }
};

export const installDevDependencies = async (
  applicationName: string,
  language: "js" | "ts"
): Promise<void> => {
  const root = path.resolve(applicationName);

  let spinner = ora("Installing devDependencies");

  try {
    spinner.start();
    const installCommand = "npm";
    let installArgs = ["install", "--save"];
    installArgs = installArgs.concat(devDependencies);

    if (language === "ts") {
      installArgs = installArgs.concat(devDependenciesTS);
    } else {
      installArgs = installArgs.concat(devDependencies);
    }

    await executeCommand(installCommand, installArgs, { cwd: root });
    spinner.succeed("DevDependencies installed successfully");
  } catch (error) {
    spinner.fail();
    throw new Error(error);
  }
};

export const copyTemplateFiles = async (
  applicationName: string,
  language: "js" | "ts"
): Promise<void> => {
  const root = path.resolve(applicationName);

  let spinner = ora("Copying template files");

  try {
    spinner.start();
    await fs.copy(
      path.join(__dirname, `template/${language}/src`),
      path.join(root, "/src")
    );
    await fs.copy(
      path.join(__dirname, "template/index.js"),
      path.join(root, "/index.js")
    );
    await fs.copy(
      path.join(__dirname, "template/README.md"),
      path.join(root, "/README.md")
    );
    await fs.copy(
      path.join(__dirname, "template/gitignore"),
      path.join(root, "/.gitignore")
    );
    if (language === "js") {
      await fs.copy(
        path.join(__dirname, "template/babelrc"),
        path.join(root, "/.babelrc")
      );
    }
    spinner.succeed("Template files copied successfully");
  } catch (error) {
    spinner.fail();
    throw new Error(error);
  }
};

export const createTSConfig = async (
  applicationName: string
): Promise<void> => {
  const root = path.resolve(applicationName);

  let spinner = ora("Creating tsconfig.json");

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
    spinner.start();
    await fs.writeFile(
      path.join(root, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2) + os.EOL
    );
    spinner.succeed("tsconfig.json created successfully");
  } catch (error) {
    spinner.fail();
    throw new Error(error);
  }
};

export const displaySuccessMessage = (applicationName: string): void => {
  const root = path.resolve(applicationName);

  console.log();
  console.log(
    `${chalk.greenBright("Success!")} Created ${chalk.yellowBright(
      applicationName
    )} at ${chalk.yellowBright(root)}`
  );
  console.log("Inside that directory, you can run several commands:");
  console.log();
  console.log(chalk.cyan(`  npm run build`));
  console.log("    Creates a local build.");
  console.log();
  console.log(chalk.cyan(`  npm start`));
  console.log("    Starts the application in the terminal.");
  console.log();
  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), root);
  console.log(`  ${chalk.cyan(`npm run build && npm start`)}`);
  console.log();
  console.log(chalk.yellowBright("Happy CLI creating!"));
};
