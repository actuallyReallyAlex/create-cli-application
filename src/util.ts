import { spawn } from "child_process";

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
