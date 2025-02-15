import { BaseClass } from '../conf/BaseClass';
import { Log } from '../util/Log';
import { expect } from '@playwright/test';
import { USER_DETAILS } from '../data/userDetails.json';
import { CreateUser } from './CreateUser';
import { ApplicationPage } from './ApplicationPage';

const APPLICATION_PAGE = new ApplicationPage();
const EMAIL_ID = USER_DETAILS.EMAIL_ID;
const PASSWORD = USER_DETAILS.PASSWORD;
const CREATE_USER = new CreateUser();

export class HomePage extends BaseClass {
  public logInBtn = '//p[contains(text(), "Login")]';
  public logInToApplyBtn = '#sign-in';
  public emailID = 'input[type="email"]';
  public nextBtn = 'button[aria-label="Next"]';
  public welcomeTxtInHomepage = '//h1[contains(text(), "Welcome back")]';
  public letsGetStartedHeading = '//h2[contains(text(),"Lets get to know you!")]';
  public alreadyUserCreated = '//span[contains(text(), "It looks like you already have a Kaleidoscope account!")]';
  public viewApplicationBtn = 'button[aria-label="View Application"]';

  async goTo() {
    Log.info('Navigating to Kaleidoscope homepage');
    await global.page.goto('https://apply.mykaleidoscope.com/program/sdet-test-scholarship', {
      waitUntil: 'networkidle',
    });
    Log.info(`URL navigated to ${global.page.url()}`);
  }

  async clickOnLoginBtn() {
    await this.clickAction(this.logInBtn, 'Login');
  }

  async clickOnLoginToApply() {
    await this.clickAction(this.logInToApplyBtn, 'Login to Apply');
  }

  async enterEmailID() {
    const randomString = Math.random().toString(36).substring(2, 8);
    const emailID = `${EMAIL_ID}_${randomString}@gmail.com`;
    Log.info('Email to be entered ' + emailID);
    await this.enterDataInField(this.emailID, emailID, 'Email ID');
  }

  async clickOnNextBtn() {
    await this.clickAction(this.nextBtn, 'Next');
  }

  async validateUserNavigatedToHomepage() {
    await global.page.waitForLoadState();
    if (await global.page.locator(this.welcomeTxtInHomepage).isVisible()) {
      await expect(global.page.locator(this.welcomeTxtInHomepage)).toBeVisible({ timeout: 80000 });
    } else {
      await expect(global.page.locator(this.letsGetStartedHeading)).toBeVisible({ timeout: 80000 });
    }
  }

  async createUserIfNotCreated() {
    Log.info('Validate if user is created');
    if (await global.page.locator(this.alreadyUserCreated).isVisible()) {
      Log.info('User is already created');
      await this.enterDataInField(CREATE_USER.password, PASSWORD, 'Password');
      await this.clickAction(CREATE_USER.signInBtn, 'Sign In');
    } else {
      Log.info('Creating user since user is not created');
      await CREATE_USER.enterCreateUserData();
      await CREATE_USER.selectAgeConfirm();
      await CREATE_USER.clickSubmitBtn();
    }
  }

  async clickOnViewApplicationBtn() {
    Log.info('Clicking on view application');
    await this.clickAction(this.viewApplicationBtn, 'View Application');
    await this.waitForElementToBePresent(APPLICATION_PAGE.printApplication, 'Print Application link');
  }
}
