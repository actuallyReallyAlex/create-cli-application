import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import { titleScreen } from "pickitt";

import { blankBoxenStyle } from "./constants";

/**
 * Displays Main Menu to user.
 * @param {AppState} state State of application.
 * @returns {Promise} Resolves with menuAction value.
 */
export const displayMainMenu = (state) =>
  new Promise(async (resolve, reject) => {
    try {
      const { menuAction } = await inquirer.prompt([
        {
          type: "list",
          message: "Main Menu",
          name: "menuAction",
          choices: [
            { value: "option1", name: "Option 1" },
            { value: "option2", name: "Option 2" },
            { value: "option3", name: "Option 3" },
            new inquirer.Separator(),
            { value: "about", name: "About" },
            { value: "exit", name: "Exit" },
          ],
        },
      ]);
      state.menuAction = menuAction;
      resolve(menuAction);
    } catch (e) {
      reject(e);
    }
  });

/**
 * Pauses the process execution and waits for the user to hit a key.
 * @returns {Promise} Resolves when user has entered a keystroke.
 * @async
 */
const keypress = async () => {
  try {
    process.stdin.setRawMode(true);
    return new Promise((resolve, reject) => {
      try {
        process.stdin.resume();
        process.stdin.once("data", () => {
          process.stdin.setRawMode(false);
          resolve();
        });
      } catch (e) {
        return reject(e);
      }
    });
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Interprets user selected menu action.
 * @param {AppState} state State of application.
 * @returns {Promise}
 */
export const interpretMenuAction = async (state) => {
  try {
    if (state.menuAction === null) {
      throw new Error("menuAction can not be `null`");
    }
    const actions = {
      about: async (state) => {
        await titleScreen("___APP NAME___");
        console.log(
          boxen(chalk.blueBright(`Author: `) + "___AUTHOR NAME___", blankBoxenStyle)
        );

        console.log("Press any key to return to Main Menu ...");
        await keypress();
        state.menuActionEmitter.emit("actionCompleted", state);
      },
      option1: async (state) => {
        await titleScreen("___APP NAME___");
        console.log("Option 1 Logic would take place here :)");
        console.log("");

        console.log("Press any key to return to Main Menu ...");
        await keypress();
        state.menuActionEmitter.emit("actionCompleted", state);
      },
      option2: async (state) => {
        await titleScreen("___APP NAME___");
        console.log("Option 2 Logic would take place here :)");
        console.log("");

        console.log("Press any key to return to Main Menu ...");
        await keypress();
        state.menuActionEmitter.emit("actionCompleted", state);
      },
      option3: async (state) => {
        await titleScreen("___APP NAME___");
        console.log("Option 3 Logic would take place here :)");
        console.log("");

        console.log("Press any key to return to Main Menu ...");
        await keypress();
        state.menuActionEmitter.emit("actionCompleted", state);
      },
      exit: (state) => process.exit(),
    };

    await actions[state.menuAction](state);
  } catch (e) {
    throw new Error(e);
  }
};
