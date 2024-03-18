import { Given, When, Then, World } from '@wdio/cucumber-framework';

import { AxeBuilder } from '@axe-core/webdriverio';
import { AxeResults, SerialFrameSelector, RunOptions, getReporter } from 'axe-core';
import * as Constants from '../utils/constants.utils.ts';
import { createHtmlReport } from 'axe-html-reporter';
import fs from 'fs';

Then('I should be able to verify Accessibility issues', async function () {
  let pageTitle = await browser.getTitle();

  const builder = new AxeBuilder({ client: browser }).withTags(Constants.ACCESSIBILITY_AXE_TAGS);
  const result: AxeResults = await builder.analyze();
  const reportHTML = createHtmlReport({
    results: result,
    options: {
      projectKey: 'Accessibility - ' + (await pageTitle) + ' page'
      // outputDir: `${process.cwd()}/report/accessibility`,
      // reportFileName: 'accessibilityReport.html'
      //doNotCreateReportFile: true
    }
  });
  console.log('reportHTML will have full content of HTML file.');
  console.log('scenario name: ' + global.scenarioName);
  // suggestion on how to create file by yourself
  if (!fs.existsSync(`${process.cwd()}/report/accessibility`)) {
    fs.mkdirSync(`${process.cwd()}/report/accessibility`, {
      recursive: true
    });
  }

  let reportName = pageTitle.replace(/[^a-zA-Z]/g, '');
  fs.writeFileSync(`${process.cwd()}/report/accessibility/${global.scenarioName}-${new Date()}.html`, reportHTML);

  await expect(result.violations.length).toBe(Constants.ACCESSIBILITY_VIOLATIONS_ACCEPTED);
});
