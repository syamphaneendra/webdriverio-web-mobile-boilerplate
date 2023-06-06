import { config } from '../../wdio.conf.ts';
import { ChainablePromiseElement } from 'webdriverio';

export default class Page {
  public async open(path: string) {
    await browser.url(`${path}`);
    await browser.maximizeWindow();
  }

  public getText = async (element: ChainablePromiseElement<WebdriverIO.Element>) => {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.scrollIntoView();
    const text = await element.getText();
    return text.trim();
  };

  public clickElement = async (element: ChainablePromiseElement<WebdriverIO.Element>) => {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.scrollIntoView();
    const text = (await element).click();
  };

  public isDisplayed = async (element: ChainablePromiseElement<WebdriverIO.Element>) => {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.scrollIntoView();
    var isDisplayed = await element.isDisplayed();
    return isDisplayed;
  };

  public isExists = async (element: ChainablePromiseElement<WebdriverIO.Element>) => {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.scrollIntoView();
    var isDisplayed = await element.isExisting();
    return isDisplayed;
  };

  public isSelected = async (element: ChainablePromiseElement<WebdriverIO.Element>) => {
    await element.waitForDisplayed({ timeout: 60000 });
    await element.scrollIntoView();
    var isDisplayed = await element.isSelected();
    return isDisplayed;
  };

  public async getAttributeValue(element, attributeName) {
    await element.waitForDisplayed({ timeout: 60000 });
    const value = await element.getAttribute(attributeName);
    return value;
  }

  public async verifyPageURL(URL) {
    await browser.waitUntil(async () => (await browser.getUrl()).includes(URL), {
      timeout: 20000,
      timeoutMsg: 'Loaded page [' + (await browser.getUrl()) + "] doesn't match the intended page [" + URL + ']',
      interval: 500
    });
  }

  public async verifyPageTitle(title) {
    await browser.pause(3000);
    let bool = false;
    let pageTitle = await browser.getTitle();
    if (pageTitle === title) bool = true;
    return bool;
  }

  public async waitForPageLoad() {
    await browser.pause(2000); // This sleep is to wait for actual page load to start & then check for page load completed or not
    await browser.waitUntil(async () => browser.execute(() => document.readyState === 'complete'), {
      timeout: 60 * 1000, // 60 seconds
      timeoutMsg: 'Page Failed to load: Timeout exceeded',
      interval: 2000
    });
  }
}
