import type { Options } from '@wdio/types';
import Arguments from './tests/utils/arguments.utils.ts';
import { setValue, getValue } from '@wdio/shared-store-service';

import fsPkg from 'fs-extra';
const { removeSync } = fsPkg;
import pkg from 'multiple-cucumber-html-reporter';
const { generate } = pkg;
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import * as ContextKeys from './tests/context/context.keys.ts';
import * as Constants from './tests/utils/constants.utils.ts';
import { remote } from 'webdriverio';
import logger from './tests/utils/logger.utils.ts'; 
import {
  Eyes,
  ClassicRunner,
  VisualGridRunner,
  RunnerOptions,
  Target,
  RectangleSize,
  Configuration,
  BatchInfo,
  BrowserType,
  ScreenOrientation,
  DeviceName,
  RunnerOptionsFluent
} from '@applitools/eyes-webdriverio';

// Logic to find the runtime argument browser name
const firefox = process.argv.includes('--firefox') ? 'FIREFOX' : '';
const docker = process.argv.includes('--docker') ? 'DOCKER' : '';
const selenoid = process.argv.includes('--selenoid') ? 'SELENOID' : '';
const edge = process.argv.includes('--edge') ? 'EDGE' : '';
const crossbrowser = process.argv.includes('--crossbrowser') ? 'CROSSBROWSER' : '';
const standalone = process.argv.includes('--standalone') ? 'STANDALONE' : '';
const safari = process.argv.includes('--safari') ? 'SAFARI' : '';
const appium = process.argv.includes('--appium') ? 'APPIUM' : '';
const browserstack = process.argv.includes('--browserstack') ? 'BROWSERSTACK' : '';
const saucelabs = process.argv.includes('--saucelabs') ? 'SAUCELABS' : '';
const serviceType = firefox || edge || docker || selenoid || crossbrowser || safari || standalone || appium || browserstack || saucelabs || 'CHROME';
console.log('Service type: ' + serviceType);
const isApplitools = process.argv.includes('--applitools') ? true : false;
console.log('isApplitools: ' + isApplitools);
const dynamicConfig = await import(`./config/wdio.${serviceType}.conf.ts`);
//console.log('dynamicConfig: ' + JSON.stringify(dynamicConfig));

// Logic to choose the baseurl based on environment
let baseUrl: string;
let lastSession: string = '';
let environment: any = await Arguments.getArgumentValue('Env');
await setValue(ContextKeys.ENVIRONMENT, environment);
const urls = {
  dev: 'https://the-internet.herokuapp.com/',
  test: 'https://the-internet.herokuapp.com/'
};
baseUrl = urls[environment];

//Actual config file
export const config: Options.Testrunner = Object.assign(
  {},
  {
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',
    autoCompileOpts: {
      autoCompile: true,
      tsNodeOpts: {
        project: './tsconfig.json',
        transpileOnly: true
      }
    },

    //
    // =====================
    // Server Configurations
    // =====================
    // Host address of the running Selenium server. This information is usually obsolete as
    // WebdriverIO automatically connects to localhost. Also, if you are using one of the
    // supported cloud services like Sauce Labs, Browserstack, Testing Bot or LambdaTest you don't
    // need to define host and port information because WebdriverIO can figure that out
    // according to your user and key information. However, if you are using a private Selenium
    // backend you should define the host address, port, and path here.
    //
    // hostname: 'localhost',
    // port: 4444,
    // path: '/',

    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // of the configuration file being run.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
    // then the current working directory is where your `package.json` resides, so `wdio`
    // will be called from there.
    //
    specs: ['./tests/features/**/*.feature'],
    // Patterns to exclude.
    exclude: [
      // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator
    //
    capabilities: [
      {
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 1,
        //
        browserName: 'chrome',
        acceptInsecureCerts: true
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
      }
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: baseUrl,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['chromedriver', 'shared-store'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [
      'dot',
      'spec',
      [
        'cucumberjs-json',
        {
          jsonFolder: `${process.cwd()}/report`,
          language: 'en',
          reportFilePerRetry: 'true'
        }
      ]
    ],

    //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
      // <string[]> (file/dir) require files before executing features
      //require: ['./tests/step-definitions/steps.ts'],
      require: [`${process.cwd()}/tests/step-definitions/*.ts`],
      // <boolean> show full backtrace for errors
      backtrace: false,
      // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
      requireModule: [],
      // <boolean> invoke formatters without executing steps
      dryRun: false,
      // <boolean> abort the run on first failure
      failFast: false,
      // <boolean> hide step definition snippets for pending steps
      snippets: true,
      // <boolean> hide source uris
      source: true,
      // <boolean> fail if there are any undefined or pending steps
      strict: false,
      // <string> (expression) only execute the features or scenarios with tags matching the expression
      tagExpression: '',
      // <number> timeout for step definitions
      timeout: 60000,
      // <boolean> Enable this config to treat undefined definitions as warnings.
      ignoreUndefinedDefinitions: false
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: async function (config: object, capabilities: Array<object>) {
      logger.info('Starting the test suite.');
      // Remove the `.report/` folder that holds the json and report files
      removeSync(`${process.cwd()}/report`);
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just after a worker process has exited.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {Number} exitCode 0 - success, 1 - fail
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {Number} retries  number of retries used
     */
    // onWorkerEnd: function (cid, exitCode, specs, retries) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
    beforeSession: async function (config, capabilities, specs, cid) {
      //Applittols logic
      let runner, batchInfo;
      if (isApplitools) {
        if (Constants.USE_ULTRAFAST_GRID) {
          // Create the runner for the Ultrafast Grid.
          // Concurrency refers to the number of visual checkpoints Applitools will perform in parallel.
          // Warning: If you have a free account, then concurrency will be limited to 1.
          runner = new VisualGridRunner(new RunnerOptionsFluent().testConcurrency(5));
        } else {
          // Create the classic runner.
          runner = new ClassicRunner();
        }
        const eyes = new Eyes(runner);

        const runnerName = Constants.USE_ULTRAFAST_GRID ? Constants.RUNNER_NAME_ULTRAGRID : Constants.RUNNER_NAME_CLASSIC;
        batchInfo = new BatchInfo(`Idenity WebdriverIO framework with the ${runnerName}`);

        batchInfo.setSequenceName(Constants.BATCH_INFO_SEQUENCE_NAME);
        const configuration = new Configuration();
        configuration.setBatch(batchInfo);
        configuration.setAppName(Constants.CONF_APPNAME);
        //configuration.setTestName('AppliTools Sample: Login');
        configuration.setApiKey(Constants.APPLITOOLS_API_KEY);
        configuration.setServerUrl(Constants.APPLITOOLS_SERVER_URL);

        if (Constants.USE_ULTRAFAST_GRID) {
          // Add 3 desktop browsers with different viewports for cross-browser testing in the Ultrafast Grid.
          // Other browsers are also available, like Edge and IE.
          configuration.addBrowser(800, 600, BrowserType.CHROME);
          configuration.addBrowser(1600, 1200, BrowserType.FIREFOX);
          configuration.addBrowser(1024, 768, BrowserType.SAFARI);

          // Add 2 mobile emulation devices with different orientations for cross-browser testing in the Ultrafast Grid.
          // Other mobile devices are available, including iOS.
          configuration.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
          configuration.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
        }

        eyes.setConfiguration(configuration);

        global.eyes = eyes;
        global.Target = Target;
        global.runner = runner;
      }
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Cucumber Hooks
     *
     * Runs before a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // beforeFeature: function (uri, feature) {
    // },
    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
     * @param {Object}                 context  Cucumber World object
     */
    beforeScenario: async function (world, context) {
      // the below if statement is cleaning the browser session only when it's the same as previous scenario's session
      // this is needed so we are spawning a new session for each scenario
      // and not reloading session when it's not needed(when session is new already during the first test run)
      if (browser.sessionId == lastSession) {
        await browser.reloadSession();
      }
      //Applittols logic
      global.scenarioName = world.pickle.name;
      if (isApplitools) {
        logger.info('Invoking applitools...');
        // Set up Execution Cloud if it will be used.
        if (Constants.USE_EXECUTION_CLOUD) {
          const executionCloudUrl = new URL(await Eyes.getExecutionCloudUrl());
          const protocol_val = executionCloudUrl.protocol.substring(0, executionCloudUrl.protocol.length - 1);
          browser = await remote({
            logLevel: 'trace',
            protocol: protocol_val,
            hostname: executionCloudUrl.hostname,
            port: Number(executionCloudUrl.port),
            capabilities: {
              browserName: 'chrome'
            }
          });
        }
        console.log('Opening Applitools eyes......');
        // Open Eyes to start visual testing.
        // It is a recommended practice to set all four inputs:
        browser = await global.eyes.open(
          // WebDriver object to "watch".
          browser,

          // The name of the application under test.
          // All tests for the same app should share the same app name.
          // Set this name wisely: Applitools features rely on a shared app name across tests.
          'Demo',

          // The name of the test case for the given application.
          // Additional unique characteristics of the test may also be specified as part of the test name,
          // such as localization information ("Home Page - EN") or different user permissions ("Login by admin").
          world.pickle.name

          // The viewport size for the local browser.
          // Eyes will resize the web browser to match the requested viewport size.
          // This parameter is optional but encouraged in order to produce consistent results.
          //new RectangleSize(1200, 858)
        );
      }
    },
    /**
     *
     * Runs before a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     * @param {Object}             context  Cucumber World object
     */
    // beforeStep: function (step, scenario, context) {
    // },
    /**
     *
     * Runs after a Cucumber Step.
     * @param {Pickle.IPickleStep} step             step data
     * @param {IPickle}            scenario         scenario pickle
     * @param {Object}             result           results object containing scenario results
     * @param {boolean}            result.passed    true if scenario has passed
     * @param {string}             result.error     error stack if scenario failed
     * @param {number}             result.duration  duration of scenario in milliseconds
     * @param {Object}             context          Cucumber World object
     */
    afterStep: async function (step, scenario, result, context) {
      if (!result.passed) {
        await cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
      }
    },
    /**
     *
     * Runs after a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
     * @param {Object}                 result           results object containing scenario results
     * @param {boolean}                result.passed    true if scenario has passed
     * @param {string}                 result.error     error stack if scenario failed
     * @param {number}                 result.duration  duration of scenario in milliseconds
     * @param {Object}                 context          Cucumber World object
     */
    afterScenario: async function (world, result, context) {
      console.log('scenario status: ' + world.result.status);
      await browser.reloadSession();
      //Applitools logic
      if (isApplitools) {
        // Close Eyes to tell the server it should display the results.
        await global.eyes.closeAsync();
      }
    },
    /**
     *
     * Runs after a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // afterFeature: function (uri, feature) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: async function (result, capabilities, specs) {
      //Applitools logic
      if (isApplitools) {
        // Close the batch and report visual differences to the console.
        // Note that it forces Mocha to wait synchronously for all visual checkpoints to complete.
        const allTestResults = await global.runner.getAllTestResults();
        console.log(allTestResults);
      }
    },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: async (): Promise<void> => {
      // Generate the report when it all tests are done
      let date = new Date();
      generate({
        jsonDir: `${process.cwd()}/report`,
        reportPath: `${process.cwd()}/report/cucumber-html-report`,
        openReportInBrowser: true,
        disableLog: true,
        saveCollectedJSON: true,
        reportName: 'Acceptance Tests Report',
        customData: {
          title: 'WDIO tests Report',
          data: [
            { label: 'Project', value: 'WDIO Demo Project' },
            { label: 'Environment', value: environment },
            { label: 'BaseURL', value: baseUrl },
            { label: 'Platform', value: process.platform },
            { label: 'Date', value: date.toLocaleDateString() }
          ]
        }
      });
    }
    /**
     * Gets executed when a refresh happens.
     * @param {String} oldSessionId session ID of the old session
     * @param {String} newSessionId session ID of the new session
     */
    // onReload: function(oldSessionId, newSessionId) {
    // }
  },
  dynamicConfig.dynamicConfig
);
//console.log('config: ' + JSON.stringify(config));
