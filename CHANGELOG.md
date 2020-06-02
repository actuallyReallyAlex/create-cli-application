# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.1] - 2020-06-02

### ✨ Website

### Added

- Demo Website

### Changed

### Removed

### Fixed

## [0.9.0] - 2020-06-01

### 📝 Clerical Adjustments

### Added

- Added [siliconeidolon](https://github.com/siliconeidolon) to acknowledgements
- Comments on `verifyNodeVersion()`

### Changed

- New user directory at success message is now also in blue
- Update README
- Update GIFs

### Removed

### Fixed

## [0.8.0] - 2020-06-01

### ✏️ Shell Option

### Added

- Check if directory exists before executing install commands
- Use `shell` option for `spawn` command if `platform === 'win32'`

### Changed

### Removed

### Fixed

- [#8 - ENOENT](https://github.com/alexlee-dev/create-cli-application/issues/8)

## [0.7.0] - 2020-06-01

### ✏️ Better Logging

### Added

- Confirmed OS's in README

### Changed

- Update Notifier will now use version from installed package.json
- Slightly more robust logging on error
- Spinner fail and then log on next line

### Removed

### Fixed

- `slant` in TypeScript not recognized as `Slant`

## [0.6.0] - 2020-06-01

### 🐛 The Bug Squasher

### Added

- Warning about unusable Node version (less than v10.0.0)
- Wrapper to check if directory exists before removing with `rimraf`
- Additional logging when an error occurs

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
