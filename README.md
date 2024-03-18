# webdriverio-web-mobile-boilerplate

This boilerplate project has WebdriverIO 8 tests with cucumber and typescript, followed by the page objects pattern.

## Frameworks:

- WebdriverIO v8
- Cucumber v8

## Features:

- Typescript v5
- Page Object Pattern
- Prettier
- Multi browser support
  - Chrome
  - Firefox
  - Edge
  - Safari
  - Standalone
- Crossbrowser parallel execution
- Appium
- Cloud testing Integration with BrowserStack & Sauce Labs
- Docker service
- Share data serice
- Separate config files for each service
- Testdata management & read by user type
- Reporting
  - Dot
  - Spec
  - Multiple cucumber html report with failure screenshots
- Gitlab pipelines for Gitlab repository
- Github actions for Github repository
- Docker compose for setting up the docker hub
- Accessibility testing using AXE
- Visual testing using Applitools
- Log mechansim

## Test execution:

- Checkout the codebase
- Install the packages using npm install
- Run the tests by using npm run wdio-\* (local/chrome/docker/appium/.......) Please refer the package.json scripts.

## Accessibility testing:
- npm run wdio-ally
- Report will be generated in artifacts directory

## Visual testing:
- npm run wdio-visual
- Require the applitool licence and either export the Key as an environment variable or update directly in the code, constant file

## Points to consider:

- Use the set/export for setting up the headless option in package.json as per the platform
- Add/Update browserstack/saucelabs credentials before executing in the cloud
- Add/Update the app capabilities while executing the native App scenarios
- Add/Update the capabilities for each service as per the requirement
- Add/Update the context keys for all the shared data which is easier to track
- Define the types for any model used in the code
- Add/Update the generic reused methods in the Page class
- Add/Update all other utility functions in the utils package

### Please feel free to update the features and contribute in maintaing this project.
