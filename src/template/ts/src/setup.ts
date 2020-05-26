import chalk from "chalk";
import clear from "clear";
import inquirer from "inquirer";
import { AppState } from "./types";

const setup = async (state: AppState): Promise<void> => {
  try {
    clear();

    console.log(
      `Welcome to ${chalk.yellowBright(
        "___APP NAME___"
      )}! Let's walk you through the initial set up.\n`
    );

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "specialKey",
        message: `Please enter your ${chalk.yellowBright("special key")}:`,
      },
    ]);
    const specialKey: string = answers.specialKey;
    state.config.set("specialKey", specialKey);

    state.config.set("isSetUp", true);
  } catch (error) {
    console.error(error);
  }
};

export default setup;
