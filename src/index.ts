import chalk from "chalk";
import commander from "commander";
// import path from "path";

const main = () => {
  let projectName;
  const program = new commander.Command("create-cli-application")
    .version("0.0.0")
    .arguments("<application-name>")
    .usage(`${chalk.yellowBright("<application-name>")} [options]`)
    .action((name) => {
      projectName = name;
    })
    .on("--help", () => {
      console.log(
        `\nOnly ${chalk.yellowBright("<application-name>")} is required.`
      );
      console.log(`\nIf you run into a problem, please open up a new issue:`);
      console.log(
        `${chalk.cyan(
          "https://github.com/alexlee-dev/create-cli-application/issues/new"
        )}\n`
      );
    })
    .parse(process.argv);

  if (projectName === "." || !projectName) {
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
    process.exit(1);
  }

  // TODO - Catch names like "my.app.name" or "my app name"

  console.log({ projectName });
};

export default main;
