import chalk from "chalk";
import clear from "clear";
import inquirer from "inquirer";

const setup = async (state) => {
  try {
    clear();

    console.log(
      `Welcome to ${chalk.yellowBright(
        "APP NAME"
      )}! Let's walk you through the initial set up.\n`
    );

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "specialKey",
        message: `Please enter your ${chalk.yellowBright("special key")}:`,
      },
    ]);
    const specialKey = answers.specialKey;
    state.config.set("specialKey", specialKey);

    state.config.set("isSetUp", true);
  } catch (error) {
    console.error(error);
  }
};

export default setup;
