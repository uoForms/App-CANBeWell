# End to End Testing

This README describes the setup and usage of testing framework for App-CANBeWell.

Last updated: Sept 29 2021

## Basic

The framework is built on top of Cypress.io. For basic usage, please see the following sources:

* [Cypress Website](https://www.cypress.io/)
* [Cypress Github Repo](https://github.com/cypress-io/cypress)
* [Cypress Guides](https://docs.cypress.io/guides/overview/why-cypress)
* [Cypress API](https://docs.cypress.io/api/table-of-contents)

This framework mainly contains three types of testing:

1. User action testing: It mainly simulates how users would interact with a webpage (e.g., go to a page, click a button
   and view some text).
2. Data analytics testing: It mainly verifies that user actions are recorded and logged via Google Analytics.
3. Text/locale testing: It mainly verifies all the strings displayed are correct. Sometimes, if the strings are (almost)
   single time used and are not subjected to [Data-driven testing](https://en.wikipedia.org/wiki/Data-driven_testing)
   style guideline. We may check the strings during user action tests since we are already on the page.

## Usage

### Local

To run tests locally, use:

```
yarn cypress
```

If you want to access coverage data, use:

```
yarn start-with-cy-coverage
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

Development build is designed to run on every pushed commits. It is controlled by `.github/workflows/ci-build-*.yml`. In
this build, the CI will start a localhost server on port 3000 in the background. The Cypress test set runs against the
said server using Chrome. Once the test execution finished, test reports are uploaded as artifacts and stored on GitHub
Actions for 7 days. If any test(s) fail, failed screenshot(s) are uploaded as well.

#### Deploy Build

Deploy build is designed to run post deploy. It is controlled by `.github/workflows/ci-deploy-*.yml`. This build is
triggered every night (UTC 4am) on master branch. It will execute the test set against `https://canbewell-test.web.app`
using Chrome. Similar to development build, test reports and screenshots are uploaded.

Note: Even if a deployment is made against other urls (e.g., real production server), the test set will still be
executed against `canbewell-test.web.app` to avoid polluting analytical data.

#### Parallelization

For data analytics testing, [Data-driven testing](https://en.wikipedia.org/wiki/Data-driven_testing) strategy is used.
Due to its unique nature of large dataset, it requires longer compute time. If all tests are running sequentially. each
test execution will take hours. In order to reduce the wait time. Parallelization is introduced. Cypress.io provides out
of box parallelization solution. Unfortunately, it is not free. Therefore, we have to create our own
implementation. `scripts/generate_cypress_test_workflow_ci_configs.py` is a script that generate github action workflow
configs. Each config contains a subset of total test cases. When the trigger event is triggered, each config will start
a new running session (or waiting in the queue for an available session slot). This will allow us to run up to 10 test
cases parallely.

#### Manual Trigger

Even though the deploy build tests are running nightly. It is still a good idea to run the tests right after a
deployment. Therefore, we also support manual triggers for all test cases. Please refer
this [document](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow#running-a-workflow)
to learn how to manually execute test cases. In most of the case, depends on the changes, we can only run a subset of
all test cases. User discretion is required.

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

The Cypress folder contains a `.eslintrc.js` file that can be utilized by IDE to enable reformatting.

The said file can also be used to enforce code style, but it is not planned at the moment.

### index.d.ts File

Cypress supports [custom commands](https://docs.cypress.io/api/cypress-api/custom-commands), but due to their
implementation, they are not discoverable by IDEs. Therefore, a Typescript file is added as a workaround. Even though
reference jump is still not available for custom commands, IDE will not display any `cannot resolve` warnings.

## Folders

### `cypress/configs`

It contains Cypress config files. See Configuration section for details.

### `cypress/integration`

#### `./userActionTests`

It contains test cases that cover user actions. To create a new test, please use the following template:

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

#### `./dataAnalyticsTests`

Due to the need of manual parallelization, the folder structure is slightly more complicated.

##### `./*-helper`

All concrete test steps are described in helper files.

##### `./testSet`

This folder contains all test execution files. Each execution file call the concrete test steps from `./*-helper`.

#### `./textLocaleTests`

Folder structure is very similar to  `./dataAnalyticsTests`

### `cypress/pageObjects`

It contains all page object models. To learn more about page object design pattern, please visit
this [page](https://www.selenium.dev/documentation/guidelines/page_object_models/)

To create a new page object, please use the following template:

```javascript
class NewPageObject extends BasePageOrOtherPageObjects {
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

Please note: `devicesTestWrapper()` is not used for the analytics testing not the text/locale testing. The difference in
viewports has no effect on network requests not parsing translation/display json files.

#### `index.d.ts`

See IDE Integration section

If a new custom command is registered, please also update this file.

#### `index.js`

It loads all custom commands and some third party plugins

### `cypress/<git ignored folders>`

Those folders are not tracked in Git. They are mostly used in the CI env to provide us more insights of the final
results or debug information if something goes wrong

## Test Reports

Currently, all Cypress test workflows generate both test result and test coverage report. However, the scope of the
reports are limited to the tests executed in that one workflow. It is for sure possible to create a new workflow to
finalize and merge all reports to one. However, due to GitHub access permission limitation, it would require a personal
access token. Since we do not have a service account and using developers' token creates more logistics challenges than
the feature's worth, therefore, it is not scheduled to implement yet.

If you would like to know the overall test results and test coverage. Please manually download all artifacts and
reference [this](https://kristijan-pajtasev.medium.com/cypress-merging-multiple-mochawesome-reports-3eb8fcaaf32c)
and [this](https://stackoverflow.com/questions/62560224/jest-how-to-merge-coverage-reports-from-different-jest-test-runs)
to merge reports manually.

## Style Guide

1. Hide all implementation details in page objects. Ideally, a non-technical collaborator could read the test file and
   have an idea of what are tested. Note: Data analytics testing is an exception due to the technical knowledge required
   to understand the test approach
2. Insert `test-id` attribute to DOM elements you are trying to retrieve in product code and use `cy.getTestId('<id>')`
   to select the said element. See
   this [best practice](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) for details.
3. Each `it block` should be independent of all other `it blocks` (same file or not).
4. Apply [single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) in both test
   and page object functions.
5. Only use `cy.wait()` when absolutely necessary
  


