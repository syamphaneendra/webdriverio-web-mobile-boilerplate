import type { Options } from '@wdio/types';
const headless: boolean = process.env.HEADLESS as unknown as boolean;

const androidWebCap = {
  maxInstances: 1, // change based on local parallel device's availability
  platformName: 'Android',
  browserName: 'chrome',
  'appium:deviceName': 'PIXEL XL API 30',
  // 'appium:platformVersion': '10.0',
  'appium:orientation': 'PORTRAIT',
  acceptInsecureCerts: true,
  'appium:newCommandTimeout': 240,
  timeouts: { implicit: 60000, pageLoad: 60000, script: 60000 }
};

const iOSWebCap = {
  maxInstances: 1, // change based on local parallel device's availability
  platformName: 'iOS',
  browserName: 'safari',
  'appium:platformName': 'iOS',
  'appium:deviceName': 'iPhone 11 Pro',
  'appium:platformVersion': '15.2',
  'appium:automationName': 'XCUITest',
  acceptInsecureCerts: true,
  timeouts: { implicit: 60000, pageLoad: 60000, script: 60000 }
};

export const dynamicConfig: Options.Testrunner = {
  capabilities: [androidWebCap],
  services: [
    [
      'appium',
      {
        command: 'appium',
        args: {
          debugLogSpacing: true,
          sessionOverride: true,
          port: 4723,
          allowInsecure: 'chromedriver_autodownload'
        }
      }
    ],
    'shared-store'
  ],
  path: '/wd/hub'
};
