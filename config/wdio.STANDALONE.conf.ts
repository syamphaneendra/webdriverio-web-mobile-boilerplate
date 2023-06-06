import type { Options } from '@wdio/types';
const headless: boolean = process.env.HEADLESS as unknown as boolean;
const browserOptions = {
  args: headless
    ? ['--disable-web-security', '--headless', '--disable-dev-shm-usage', '--no-sandbox', '--window-size=1920,1080']
    : ['--disable-web-security', '--disable-dev-shm-usage', '--no-sandbox', '--window-size=1920,1080']
};

// Arguments for selenium standalone service
const drivers = {
  chrome: { version: '113.0.5672.127', arch: process.arch } // https://chromedriver.chromium.org/
  //firefox: { version: '0.33.0', arch: process.arch } // https://github.com/mozilla/geckodriver/releases
  //chromiumedge: { version: '112.0.5615.49' } // https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
};

export const dynamicConfig: Options.Testrunner = {
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': browserOptions,
      acceptInsecureCerts: true
    }
  ],
  services: [['selenium-standalone', { drivers: { chrome: true } }], 'shared-store']
};
