<p align="center">
  <a href="https://github.com/alexlee-dev/create-cli-application" rel="noopener">
 <img width=256px height=256px src="https://res.cloudinary.com/alexlee-dev/image/upload/v1590513975/create-cli-application/proud.svg" alt="Logo"></a>
</p>

<h3 align="center">create-cli-application</h3>

<div align="center">

[![NPM](https://img.shields.io/npm/v/create-cli-application.svg)](https://www.npmjs.com/package/create-cli-application)
[![GitHub Issues](https://img.shields.io/github/issues/alexlee-dev/create-cli-application)](https://github.com/alexlee-dev/create-cli-application/issues)
[![Dependencies](https://img.shields.io/david/alexlee-dev/create-cli-application)](https://github.com/alexlee-dev/create-cli-application)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">A bootstrapper for creating a cli application with Node.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

I generally use a template when developing CLI applications for myself. I want to share that same template with you, in an easy to use bootstrapper that mirrors the simplicity of starting a new application with [create-react-app](https://github.com/facebook/create-react-app). Thus, **create-cli-application** was born.

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

- Node
- NPM

### Installing

`npm install -g create-cli-application`

## 🎈 Usage <a name="usage"></a>

`create-cli-application cool-app-name`

### Changing the Source Language

By deafault, **create-cli-application** will create your application as a JavaScript project. You can pass the `--typescript` flag to create a TypeScript project instead.

`create-cli-application cool-app-name --typescript`

Want support for an additional language? Feel free to open a [new issue](https://github.com/alexlee-dev/create-cli-application/issues/new).

## ⛏️ Built Using <a name = "built_using"></a>

- [@sentry/node](https://sentry.io/welcome/) - Sentry is cross-platform application monitoring, with a focus on error reporting.
- [boxen](https://github.com/sindresorhus/boxen) - Create boxes in the terminal.
- [chalk](https://github.com/chalk/chalk) - Terminal string styling done right.
- [clear](https://github.com/bahamas10/node-clear) - Clear the terminal screen if possible.
- [configstore](https://github.com/yeoman/configstore) - Easily load and persist config without having to think about where and how.
- [fs-extra](https://github.com/jprichardson/node-fs-extra) - Node.js: extra methods for the fs object like copy(), remove(), mkdirs().
- [inquirer](https://github.com/SBoudrias/Inquirer.js) - A collection of common interactive command line user interfaces.
- [ora](https://github.com/sindresorhus/ora) - Elegant terminal spinner.
- [pickitt](https://pickitt.netlify.com/) - When you need a computer to just pick it, reach for Pickitt!
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [validate-npm-package-name](https://github.com/npm/validate-npm-package-name) - Is the given string an acceptable npm package name?

## ✍️ Authors <a name = "authors"></a>

- [Alex Lee](https://github.com/alexlee-dev) - Application Developer

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Some inspiration from the developers behind [create-react-app](https://github.com/facebook/create-react-app).
