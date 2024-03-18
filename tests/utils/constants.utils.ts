//Applitools Constants
export const USE_ULTRAFAST_GRID: boolean = true;
export const APPLITOOLS_API_KEY: string = process.env.APPLITOOLS_API_KEY;
export const APPLITOOLS_SERVER_URL: string = 'https://org.applitools.com/';
export const RUNNER_NAME_ULTRAGRID: string = 'Ultrafast Grid';
export const RUNNER_NAME_CLASSIC: string = 'Classic runner';
export const BATCH_INFO_SEQUENCE_NAME: string = 'Cucumber Tests';
export const CONF_APPNAME: string = 'Automation Practice';
export const CONF_TESTNAME: string = 'Cucumber Tests';
export const USE_EXECUTION_CLOUD: boolean = false;

//Accessibility Constants
export const ACCESSIBILITY_AXE_TAGS: string | string[] = ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
export const ACCESSIBILITY_VIOLATIONS_ACCEPTED: number = 0;