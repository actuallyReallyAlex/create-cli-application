import { spawn } from "child_process";
import fs from "fs-extra";
import path from "path";

/**
 * Executes a command in a spawned process.
 * @param command Command to execute in the process.
 * @param args Additional arguments to attach to the command.
 * @param options Optional options object to pass along.
 */
export const executeCommand = async (
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

    await executeCommand("rimraf", [root]);
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
    if (filePath === "/src/menu.js" || filePath === "/src/menu.ts")
      newFileContent = newFileContent.replace(replaceToken, authorName);
    await fs.writeFile(filePath, newFileContent, "utf8");
    return;
  });
};
