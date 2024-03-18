import { Given, When, Then, World } from '@wdio/cucumber-framework';

Then('I see the GUI of the page as expected', async function () {
  let pageTitle = await browser.getTitle();
  let visualPageName = await pageTitle.replace(/[^a-zA-Z]/g, '');
  await global.eyes.check(visualPageName, global.Target.window().fully());
});
