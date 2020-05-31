import chalk from "chalk";
import clear from "clear";
import inquirer from "inquirer";
import { AppState } from "./types";

/**
 * Walk the user through an initial setup and store values on the machine.
 * @param state Application State
 */
const setup = async (state: AppState): Promise<void> => {
  try {
    clear();

    console.log(
      `Welcome to ${chalk.blueBright(
        "___APP NAME___"
      )}! Let's walk you through the initial set up.\n`
    );

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "specialKey",
        message: `Please enter your ${chalk.blueBright("special key")}:`,
      },
    ]);
    // * Template value. Change to be required setup or don't set up at all :)
    const specialKey: string = answers.specialKey;
    state.config.set("specialKey", specialKey);

    // * Tell the application that the user has gone through this process.
    // * This value persists thanks to the locally stored configuration.
    state.config.set("isSetUp", true);
  } catch (error) {
    console.error(error);
  }
};

export default setup;
