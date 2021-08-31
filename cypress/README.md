# End to End Testing

This README describes the setup and usage of testing framework for App-CANBeWell.

Last updated: Aug 31 2021

## Basic

The framework is built on top of Cypress.io. For basic usage, please see the following sources:

* [Cypress Website](https://www.cypress.io/)
* [Cypress Github Repo](https://github.com/cypress-io/cypress)
* [Cypress Guides](https://docs.cypress.io/guides/overview/why-cypress)
* [Cypress API](https://docs.cypress.io/api/table-of-contents)

## Usage

To run tests locally, use:

```
yarn cypress
```

CI usage has not been defined yet.

## Configuration

Cypress requires a config file to start. The base file `cypress.json` is defined at root level. It should not be used
directly.

For local development, `yarn cypress` automatically apply `/cypress/configs/local.json`.

CI usage has not been defined yet.

## IDE Integration

### Eslint

The Cypress folder contains a `.eslintrc.js` file that can be utilized by IDE to enable reformatting

The said file can also be used to enforce code style, but it is not planned at the moment.

### index.d.ts File

Cypress supports [custom commands](https://docs.cypress.io/api/cypress-api/custom-commands), but due to their
implementation, they are not discoverable by IDEs. Therefore, a Typescript file is added as a workaround. Even though
reference jump is still not available for custom commands, IDE will not display any `cannot resolve` warnings.

## Folders

### `cypress/configs`

It contains Cypress config files. See Configuration section for details.

### `cypress/integration`

It contains test cases. To create a new test, please use the following template:

```javascript
import devicesTestWrapper from '../support/devicestestWrapper';

devicesTestWrapper(
    '<Test target>', () => {
        beforeEach(() => {
            // Test Setup
        });

        it('<Test Detail>', () => {
            // Test Code
        });

        it('<Another Test Detail>', () => {
        });

        // ...
    },
);
```

### `cypress/logs`

It is not tracked in Git. The purpose of this folder is to collect all failed test log.

CI usage has not been defined yet.

### `cypress/pageObjects`

It contains all page object models. To learn more about page object design pattern, please visit
this [page](https://www.selenium.dev/documentation/guidelines/page_object_models/)

To create a new page object, please use the following template:

```javascript
class NewPageObject extends <BasePage or OtherPageObject>{
    helperFunction() {
        // code
    }

    // ...
}

export default NewPageObject;
```

### `cypress/plugin`

It helps Cypress to load some third party plugins. To modify this folder, please reference third party plugin's guides.

### `cypress/support`

#### `commands.js`

This file contains all the system level util functions in the form of custom commands

#### `devicesTestWrapper.js`

This file allows us to run the same test case multiple times with different viewports. Current, we support

* Laptop 1440x900
* Tablet Horizontal 1024x768
* Tablet Vertical 768x1024
* Phone Horizontal 736x414
* Phone Vertical 414x736

#### `index.d.ts`

See IDE Integration section

If a new custom command is registered, please also update this file.

#### `index.js`

It loads all custom commands and some third party plugins

## Style Guide

1. Hide all implementation details in page objects. Ideally, a non-technical collaborator could read the test file and
   have an idea of what are tested.
2. Insert `test-id` attribute to DOM elements you are trying to retrieve in product code and use `cy.getTestId('<id>')`
   to select the said element. See
   this [best practice](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) for details.
3. Each `it block` should be independent of all other `it blocks` (same file or not).
4. Apply [single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) in both test
   and page object functions.
5. Only use `cy.wait()` when absolutely necessary
  


