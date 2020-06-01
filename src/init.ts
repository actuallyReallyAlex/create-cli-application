import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import os from "os";
import path from "path";

import { dependencies, devDependencies, devDependenciesTS } from "./constants";
import { executeCommand, valueReplacer } from "./util";

/**
 * Creates a project directory and a package.json inside that new directory.
 * @param applicationName Name of application.
 * @param language Language of application
 */
export const createProjectDirectory = async (
  applicationName: string,
  language: "js" | "ts"
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  // ? Needed?
  fs.ensureDirSync(root);

  console.log();
  console.log(`Creating a new CLI app in ${chalk.blueBright(root)}.`);
  console.log();
  console.log(
    `Source Language: ${
      language === "js"
        ? chalk.blueBright("JavaScript")
        : chalk.blueBright("TypeScript")
    }`
  );
  console.log();

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
    // * Create package.json
    await fs.writeFile(
      path.join(root, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );
    spinner.succeed(
      "Application Directory and package.json created successfully"
    );
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Installs dependencies.
 * @param applicationName Name of application.
 */
export const installDependencies = async (
  applicationName: string
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Installing dependencies");

  try {
    spinner.start();
    const installCommand = "npm";
    let installArgs = ["install", "--save"];
    installArgs = installArgs.concat(dependencies);
    // * Verify that the directory exists 1st
    const pathExists = await fs.pathExists(root);
    if (pathExists) {
      // * Create a process that installs the dependencies
      await executeCommand(installCommand, installArgs, {
        cwd: root,
        shell: process.platform === "win32",
      });
      spinner.succeed("Dependencies installed successfully");
    } else {
      spinner.fail(`Path: ${root} does not exist.`);
      throw new Error(`Path: ${root} does not exist.`);
    }
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Installs dev dependencies.
 * @param applicationName Name of application.
 * @param language Language of application.
 */
export const installDevDependencies = async (
  applicationName: string,
  language: "js" | "ts"
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Installing devDependencies");

  try {
    spinner.start();
    const installCommand = "npm";
    let installArgs = ["install", "--save-dev"];
    installArgs = installArgs.concat(devDependencies);

    if (language === "ts") {
      installArgs = installArgs.concat(devDependenciesTS);
    } else {
      installArgs = installArgs.concat(devDependencies);
    }

    // * Verify that the directory exists 1st
    const pathExists = await fs.pathExists(root);
    if (pathExists) {
      // * Create a process that installs the dependencies
      await executeCommand(installCommand, installArgs, {
        cwd: root,
        shell: process.platform === "win32",
      });
      spinner.succeed("DevDependencies installed successfully");
    } else {
      spinner.fail(`Path: ${root} does not exist.`);
      throw new Error(`Path: ${root} does not exist.`);
    }
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Copies template files.
 * @param applicationName Name of application.
 * @param language Language of application.
 */
export const copyTemplateFiles = async (
  applicationName: string,
  language: "js" | "ts"
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Copying template files");

  try {
    spinner.start();
    const requiredFilesToCopy = [
      {
        src: path.join(__dirname, `template/${language}/src`),
        dest: path.join(root, "/src"),
      },
      {
        src: path.join(__dirname, "template/index.js"),
        dest: path.join(root, "/index.js"),
      },
      {
        src: path.join(__dirname, "template/README.md"),
        dest: path.join(root, "/README.md"),
      },
      {
        src: path.join(__dirname, "template/gitignore"),
        dest: path.join(root, "/.gitignore"),
      },
    ];

    // * Copy Template Files
    await Promise.all(
      requiredFilesToCopy.map(
        async (fileInfo: { src: string; dest: string }) => {
          await fs.copy(fileInfo.src, fileInfo.dest);
          return;
        }
      )
    );

    // * Copy .babelrc for JS projects
    if (language === "js") {
      await fs.copy(
        path.join(__dirname, "template/babelrc"),
        path.join(root, "/.babelrc")
      );
    }

    spinner.succeed("Template files copied successfully");
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Replaces template files placeholder values with real values for the application.
 * @param applicationName Name of application.
 * @param language Language of application.
 * @param authorName Name of author.
 */
export const replaceTemplateValues = async (
  applicationName: string,
  language: "js" | "ts",
  authorName: string
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Replacing values in template files");
  try {
    spinner.start();

    const jsFilesToRewrite = [
      path.join(root, "README.md"),
      path.join(root, "/src/index.js"),
      path.join(root, "/src/menu.js"),
      path.join(root, "/src/setup.js"),
    ];
    const tsFilesToRewrite = [
      path.join(root, "README.md"),
      path.join(root, "/src/index.ts"),
      path.join(root, "/src/menu.ts"),
      path.join(root, "/src/setup.ts"),
    ];

    let replaceFiles = jsFilesToRewrite;

    if (language === "ts") replaceFiles = tsFilesToRewrite;

    // * Apply real values to template files
    await Promise.all(
      valueReplacer(
        replaceFiles,
        /___APP NAME___/gm,
        applicationName,
        authorName
      )
    );
    spinner.succeed("Values in template files replaced successfully");
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Creates a tsconfig.json file in the application directory.
 * @param applicationName Name of application.
 */
export const createTSConfig = async (
  applicationName: string
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Creating tsconfig.json");

  // * Basic tsconfig needed to build the application
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
    // * Create tsconfig.json file
    await fs.writeFile(
      path.join(root, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2) + os.EOL
    );
    spinner.succeed("tsconfig.json created successfully");
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Display a success message to the user.
 * @param applicationName Name of application.
 */
export const displaySuccessMessage = (applicationName: string): void => {
  // * Application Directory
  const root = path.resolve(applicationName);

  console.log();
  console.log(
    `${chalk.greenBright("Success!")} Created ${chalk.blueBright(
      applicationName
    )} at ${chalk.blueBright(root)}`
  );
  console.log("Inside that directory, you can run several commands:");
  console.log();
  console.log(chalk.blueBright(`  npm run build`));
  console.log("    Creates a local build.");
  console.log();
  console.log(chalk.blueBright(`  npm start`));
  console.log("    Starts the application in the terminal.");
  console.log();
  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.blueBright("  cd"), root);
  console.log(`  ${chalk.blueBright(`npm run build && npm start`)}`);
  console.log();
  console.log(chalk.blueBright("Happy CLI creating!"));
};
