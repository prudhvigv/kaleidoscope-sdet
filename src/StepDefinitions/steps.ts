import { BaseClass } from '../conf/BaseClass';
import { ApplicationPage } from '../Pages/ApplicationPage';
import { CreateUser } from '../Pages/CreateUser';
import { HomePage } from '../Pages/HomePage';
import { Given, Then, When } from '@cucumber/cucumber';

const APPLICATION_PAGE = new ApplicationPage();
const BASE_CLASS = new BaseClass();
const HOME_PAGE = new HomePage();
const CREATE_USER = new CreateUser();

Given('User navigated to scholarship landing page', async () => {
  await global.page.setDefaultNavigationTimeout(100000);
  await HOME_PAGE.goTo();
});

Then('user clicks on Login button', async () => {
  await HOME_PAGE.clickOnLoginBtn();
});

Then('user enters EMAIL in email id field', async () => {
  await HOME_PAGE.enterEmailID();
});

Then('user clicks on Next page button', async () => {
  await HOME_PAGE.clickOnNextBtn();
});

Then('user enter basic details', async () => {
  await CREATE_USER.enterCreateUserData();
});

Then('user clicked on age confirmation checkbox', async () => {
  await CREATE_USER.selectAgeConfirm();
});

Then('user clicks on submit button', async () => {
  await CREATE_USER.clickSubmitBtn();
});

Then('verify if user is registered', async () => {
  await HOME_PAGE.validateUserNavigatedToHomepage();
});

Then('verify if user is already created else create a user', async () => {
  await HOME_PAGE.createUserIfNotCreated();
});

When('validate if First name, Last name and Email address are auto populated', async () => {
  await APPLICATION_PAGE.validateUserDetailsInApplication();
});

When('user enters address details', async () => {
  await APPLICATION_PAGE.enterAddressDetails();
});

Then('user clicks on Next button', async () => {
  await BASE_CLASS.clickAction(APPLICATION_PAGE.nextPage);
});

When('user verifies if 2 extracurricular activities are required', async () => {
  await APPLICATION_PAGE.validateErrorMsgInExtraCurricPage();
});

Then('user enters 2 extracurricular activities', async () => {
  await APPLICATION_PAGE.enter2ExtraCurrActivities();
});

When('user enters high school information', async () => {
  await APPLICATION_PAGE.enterHighSchoolInfo();
});

When('user uploads transcript', async () => {
  await APPLICATION_PAGE.uploadTranscript();
});

When('user validates essay checkbox functionality', async () => {
  await APPLICATION_PAGE.validateEssayCheckbox();
});

When('user selects {string} checkbox and enter essay', async checkBox => {
  await APPLICATION_PAGE.selectCheckBoxEnterEssay(checkBox);
});

When('validate if user is landed on review page', async () => {
  await APPLICATION_PAGE.userNavigatedToReviewPage();
});

When('user validates values in review page', async () => {
  await APPLICATION_PAGE.validateValuesInReviewPage();
});

When('user clicks on Submit application button', async () => {
  await BASE_CLASS.clickAction(APPLICATION_PAGE.submitApplicationBtn, 'Submit Application button');
});

Then('validate if application is submitted', async () => {
  await BASE_CLASS.setTimeout(4000);
  await APPLICATION_PAGE.validateApplicationSubmitted();
});

When('click on view application button', async () => {
  await HOME_PAGE.clickOnViewApplicationBtn();
});

Then('verify if user is not able to edit application', async () => {
  await APPLICATION_PAGE.validateUserCannotEditApp();
});
