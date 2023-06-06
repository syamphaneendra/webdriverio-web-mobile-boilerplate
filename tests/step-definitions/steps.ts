import { Given, When, Then } from '@wdio/cucumber-framework';

import DemoLoginPage from '../pageobjects/demo.login.page.ts';
import SecurePage from '../pageobjects/demo.secure.page.ts';
import UserDataService from '../services/userdata.service.ts';
import { Users } from '../types/Users.ts';
import * as ContextKeys from '../context/context.keys.ts';
import { setValue, getValue } from '@wdio/shared-store-service';

Given(/^I am on the (\w+) page$/, async (page) => {
  await DemoLoginPage.open();
});

When(/^I login to the application with (\w+)$/, async (userType) => {
  console.log('userdata: ' + (await UserDataService.getUserByType(userType)).userName);
  const loggedInUser: Users = await UserDataService.getUserByType(userType);
  await setValue(ContextKeys.LOGGED_IN_USER, loggedInUser);
  await DemoLoginPage.login(loggedInUser.userName, loggedInUser.userPassword);
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
  await expect(SecurePage.flashAlert).toBeExisting();
  await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});
