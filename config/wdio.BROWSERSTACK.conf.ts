import type { Options } from '@wdio/types';
const headless: boolean = process.env.HEADLESS as unknown as boolean;

const androidWebCap = {
  maxInstances: 1,
  browserName: 'chrome',
  platformName: 'Android',
  browserVersion: 'latest',
  // Sauce options can be found here https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
  'sauce:options': {
    //tunnelIdentifier: 'YourTunnelName',
    screenResolution: '1600x1200'
  }
};

export const dynamicConfig: Options.Testrunner = {
  // user: 'login username',
  // key: '1234-abcd-...',
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  region: 'eu-central-1', // or 'eu' or 'apac',
  capabilities: [androidWebCap],
  services: ['browserstack', 'shared-store']
};
