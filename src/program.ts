import chalk from "chalk";
import commander from "commander";

/**
 * Handles an incorrectly named application.
 * @param program Program parsing user input.
 */
export const handleIncorrectApplicationName = (program: commander.Command) => {
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
  // * Exit the program
  process.exit(1);
};
