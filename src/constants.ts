/**
 * These dependencies are required for the cli application regardless of language.
 */
export const dependencies = [
  "boxen",
  "chalk",
  "clear",
  "configstore@^5.0.1",
  "figlet",
  "inquirer",
];

/**
 * These dev dependencies are for JavaScript projects.
 */
export const devDependencies = [
  "@babel/core",
  "@babel/cli",
  "@babel/preset-env",
  "@babel/plugin-transform-runtime",
  "@babel/runtime",
];

/**
 * These dev dependencies are for TypeScript projects.
 */
export const devDependenciesTS = [
  "@types/clear",
  "@types/configstore",
  "@types/figlet",
  "@types/inquirer",
  "@types/node",
  "rimraf",
  "typescript",
];
