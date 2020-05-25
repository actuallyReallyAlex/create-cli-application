import yargs from "yargs";

const main = () => {
  yargs
    .scriptName("create-cli-application")
    .usage("$0 [application-name]")
    .command(
      "create",
      "Creates a bootstrapped cli application in the current directory.",
      (yargs) => {
        yargs.positional("application-name", {
          type: "string",
          default: "cool-app",
          describe: "The name of the application to create.",
        });
      },
      function (argv) {
        console.log({ argv });
      }
    )
    .demandCommand()
    .help().argv;
};

export default main;
