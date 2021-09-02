# End to End Testing

This README describes the setup and usage of testing framework for App-CANBeWell.

Last updated: Sept 1 2021

## Basic

The framework is built on top of Cypress.io. For basic usage, please see the following sources:

* [Cypress Website](https://www.cypress.io/)
* [Cypress Github Repo](https://github.com/cypress-io/cypress)
* [Cypress Guides](https://docs.cypress.io/guides/overview/why-cypress)
* [Cypress API](https://docs.cypress.io/api/table-of-contents)

## Usage

### Local

To run tests locally, use:

```
yarn cypress
```

### [GitHub Actions](https://docs.github.com/en/actions)

#### Background

The application code is built and deployed via Travis CI. Logically, the test infrastructure should also be hosted on
the said CI provider. However, after careful consideration, the test infra is hosted on GitHub Actions. Travis CI is
free for public repos. However, once the initial free usage(1000 mins in a Linux environment) runs out, a repo
maintainer needs to submit a request to Travis CI support for an allotment which may take a few days. Potentially, this
[policy](https://blog.travis-ci.com/2020-11-02-travis-ci-new-billing) can cause delayed deploy in hotfix scenarios when
test infra "wasted" all CI usages. On the other
hand, ["GitHub Actions usage is free for both public repositories and self-hosted runners."](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions)
There is less limitation and the above undesired use case can be avoided completely.

#### Development Build

Development build is designed to run on every pushed commits. It is controlled
by `.github/workflows/ci-build-cy-test.yml`. In this build, the CI will start a localhost server on port 3000 in the
background. The Cypress test set runs against the said server using Chrome. Once the test execution finished, test
reports are uploaded as artifacts and stored on GitHub Actions for 7 days. If any test(s) fail, failed screenshot(s) are
uploaded as well.

#### Deploy Build

Deploy build is designed to run post deploy. It is controlled by `.github/workflows/ci-deploy-cy-test.yml`. This build
only triggers when master branch is updated. It will wait for Travis CI deploy to finish and execute the test set
against `https://canbewell-test.web.app` using Chrome. Similar to development build, test reports and screenshots are
uploaded.

Note: Even if a deployment is made against other urls (e.g., real production server), the test set will still be
executed against `canbewell-test.web.app` to avoid polluting analytical data.

## Configuration

Cypress requires a config file to start. The base file `cypress.json` is defined at root level. It should not be used
directly.

### Local

For local development, `yarn cypress` automatically apply `/cypress/configs/local.json`.

### Test against development server on CI

This config is used to run test against local development server. See Usage section for more details.

### Test against deployed server on CI

This config is used to run test against a live hosted deploy. See Usage section for more details.

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

To find failed test log in GitHub Actions, please use build log.

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
  


