# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - _Unreleased_

### Added

- Warning about unusable Node version (less than v10.0.0)

### Changed

- Format of website in `author` field of `package.json`
- Changed terminal colors to be more more legible on bright terminals
- Abstracted the `titleScreen()` functionality into `create-cli-application` itself, so `pickitt` is not needed

### Removed

- `Terminalizer` as a devDependency

### Fixed

- Add missing `rimraf` dependency
- Fix installing devDependencies without `--save-dev`
- Fix `slant` not being recognized by Figlet as `Slant` in fonts

## [0.5.0] - 2020-05-29

### ❗Update Notifier

### Added

- CONTRIBUTING.md
- GIF examples
- Use of `update-notifier` to alert the user to a newer version
- Added `Additional Features to Be Added` to README

### Changed

### Removed

### Fixed

- `___AUTHOR NAME___` not being overwritten in template during interactive mode

## [0.4.0] - 2020-05-27

### ✨ Interactivity

### Added

- Interactive option. Use the flag `--interactive` to use this mode
- Comments :)
- Cleanup on global error
- Option for Author Name
- Validation of application name according to NPM conventions

### Changed

- Refactored `copyTemplateFiles()`

### Removed

### Fixed

## [0.3.0] - 2020-05-26

### ✏️ Application Name in Template Files

### Added

- Replace generic "APP NAME" in template files with applicationName value

### Changed

### Removed

### Fixed

## [0.2.0] - 2020-05-26

### 🔧 Vanilla JS Support

### Added

- Support for both JS (deafult language) and TS (passed as '--typescript' option)

### Changed

- Add "release" to Sentry config

### Removed

### Fixed

- Fixed broken links on README

## [0.1.0] - 2020-05-26

### 🚀 First Happy Path Solution

### Added

- Initial logic of create-cli-application

### Changed

### Removed

### Fixed
