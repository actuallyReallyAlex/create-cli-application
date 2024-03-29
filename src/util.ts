import chalk from "chalk";
import { spawn } from "child_process";
import fs from "fs-extra";
import path from "path";
import semver from "semver";
import validateProjectName from "validate-npm-package-name";

/**
 * Executes a command in a spawned process.
 * @param command Command to execute in the process.
 * @param args Additional arguments to attach to the command.
 * @param options Optional options object to pass along.
 */
export const executeCommand = async (
  command: string,
  args?: string[],
  options?: { cwd?: string; shell?: boolean }
): Promise<void | { code: number; signal: any }> =>
  new Promise((resolve, reject) => {
    const cp = spawn(command, args, options);
    cp.on("error", (err: Error) => {
      if (err) {
        console.log("");
        console.error(JSON.stringify({ err, command, args, options }, null, 2));
        console.log("");
        reject(err.message);
      }
    });
    cp.on("exit", (code: number | null, signal) => {
      if (code !== 0) {
        console.log("");
        console.error(
          JSON.stringify({ args, command, code, signal, options }, null, 2)
        );
        console.log("");
        reject({ args, command, code, signal, options });
      }
      resolve();
    });
    cp.on("message", (message) => {
      console.log({ message });
    });
  });

/**
 * Clean up created directory and files if error occurs.
 * @param applicationName Name of application.
 */
export const cleanupError = async (
  applicationName: string | undefined
): Promise<void> => {
  try {
    if (!applicationName) {
      return;
    }

    // * Application Directory
    const root = path.resolve(applicationName);

    const rootExists = await fs.pathExists(root);

    if (rootExists) {
      await executeCommand("rimraf", [root], {
        shell: process.platform === "win32",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Replaces a token in a list of template files with the appropriate values.
 * @param files Array of files to replace values in.
 * @param replaceToken Regex used to find the values in the template file.
 * @param applicationName Name of application.
 * @param authorName Name of author.
 */
export const valueReplacer = (
  files: string[],
  replaceToken: any,
  applicationName: string,
  authorName: string
) => {
  return files.map(async (filePath: string) => {
    const file = await fs.readFile(filePath, "utf-8");
    let newFileContent = file.replace(replaceToken, applicationName);
    if (filePath.includes("menu"))
      newFileContent = newFileContent.replace(
        /___AUTHOR NAME___/gm,
        authorName
      );
    await fs.writeFile(filePath, newFileContent, "utf8");
    return;
  });
};

/**
 * Validates the application name according to NPM naming conventions.
 * @param applicationName Name of application.
 */
export const validateApplicationName = (applicationName: any) => {
  const validation = validateProjectName(applicationName);
  if (!validation.validForNewPackages) {
    console.error(
      `Cannot create an application named ${chalk.red(
        `"${applicationName}"`
      )} because of npm naming restrictions:`
    );
    console.log("");

    [...(validation.errors || []), ...(validation.warnings || [])].forEach(
      (error) => {
        console.error(chalk.red(`  * ${error}`));
      }
    );

    console.log("");
    console.error("Please choose a different application name.");
    process.exit(1);
  }
};

/**
 * Verifies that the application can run. Needs >= Node v10.0.0
 */
export const verifyNodeVersion = (): void => {
  if (!semver.satisfies(process.version, ">=10.0.0")) {
    console.error(
      chalk.red(`create-cli-application requires Node v10 or higher.`)
    );
    console.error(chalk.red(`You are running Node ${process.version}.`));
    console.error(chalk.red(`Please update your version of Node.`));
    process.exit(1);
  }
};
