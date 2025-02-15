import { BaseClass } from '../conf/BaseClass';
import {
  USER_DETAILS,
  ADDRESS_DETAILS,
  EXTRA_CURRICULAR_ACTIVITIES,
  HIGH_SCHOOL_INFO,
  ESSAY,
} from '../data/userDetails.json';
import { expect } from '@playwright/test';
import { Log } from '../util/Log';

let appSubmittedURL = '';

const FIRST_NAME = USER_DETAILS.FIRST_NAME;
const LAST_NAME = USER_DETAILS.LAST_NAME;
const EMAIL_ID = USER_DETAILS.EMAIL_ID;
const ADDRESS = ADDRESS_DETAILS.STREET_ADDRESS;
const STATE = ADDRESS_DETAILS.STATE;
const CITY = ADDRESS_DETAILS.CITY;
const ZIPCODE = ADDRESS_DETAILS.ZIP_CODE;
const COUNTRY = ADDRESS_DETAILS.COUNTRY;
const EC_ACTIVITY_1 = EXTRA_CURRICULAR_ACTIVITIES.ACTIVITY_NAME_1;
const YEARS_INVOLVED_1 = EXTRA_CURRICULAR_ACTIVITIES.YEARS_INVOLVED_1;
const LEADERSHIPROLES_1 = EXTRA_CURRICULAR_ACTIVITIES.LEADERSHIP_ROLES_1;
const DESCRIPTION_1 = EXTRA_CURRICULAR_ACTIVITIES.DESCRIPTION_1;
const EC_ACTIVITY_2 = EXTRA_CURRICULAR_ACTIVITIES.ACTIVITY_NAME_2;
const YEARS_INVOLVED_2 = EXTRA_CURRICULAR_ACTIVITIES.YEARS_INVOLVED_2;
const LEADERSHIPROLES_2 = EXTRA_CURRICULAR_ACTIVITIES.LEADERSHIP_ROLES_2;
const DESCRIPTION_2 = EXTRA_CURRICULAR_ACTIVITIES.DESCRIPTION_2;
const EC_ACTIVITY_3 = EXTRA_CURRICULAR_ACTIVITIES.ACTIVITY_NAME_3;
const YEARS_INVOLVED_3 = EXTRA_CURRICULAR_ACTIVITIES.YEARS_INVOLVED_3;
const LEADERSHIPROLES_3 = EXTRA_CURRICULAR_ACTIVITIES.LEADERSHIP_ROLES_3;
const DESCRIPTION_3 = EXTRA_CURRICULAR_ACTIVITIES.DESCRIPTION_3;
const EC_ACTIVITY_4 = EXTRA_CURRICULAR_ACTIVITIES.ACTIVITY_NAME_4;
const YEARS_INVOLVED_4 = EXTRA_CURRICULAR_ACTIVITIES.YEARS_INVOLVED_4;
const LEADERSHIPROLES_4 = EXTRA_CURRICULAR_ACTIVITIES.LEADERSHIP_ROLES_4;
const DESCRIPTION_4 = EXTRA_CURRICULAR_ACTIVITIES.DESCRIPTION_4;
const SCHOOL_NAME = HIGH_SCHOOL_INFO.NAME;
const SCHOOL_ADDRESS = HIGH_SCHOOL_INFO.ADDRESS;
const SCHOOL_CITY = HIGH_SCHOOL_INFO.CITY;
const SCHOOL_STATE = HIGH_SCHOOL_INFO.STATE;
const SCHOOL_POSTAL = HIGH_SCHOOL_INFO.ZIP_CODE;
const YEAR_GRADUATION = HIGH_SCHOOL_INFO.Year_Of_Graduation;
const GPA = HIGH_SCHOOL_INFO.GPA;
const CARS = ESSAY.CARS;
const ANIMALS = ESSAY.ANIMALS;
const SCHOOLS = ESSAY.SCHOOLS;
const OTHERS = ESSAY.OTHERS;

export class ApplicationPage extends BaseClass {
  public firstName = 'input[name="contact.firstName"]';
  public lastName = 'input[name="contact.lastName"]';
  public emailAdd = 'input[name="contact.email"]';
  public streetAddress = 'input[name="contact.address"]';
  public state = 'input[placeholder="Enter your state"]';
  public stateName = state => `//span[contains(text(), "${state}")]`;
  public city = 'input[placeholder="Enter your city"]';
  public zipcode = 'input[name="contact.zip"]';
  public country = 'input[placeholder="Enter your country"]';
  public nextPage = 'button[type="submit"]';
  public errorMsgExtraCurAct = '//p[contains(text(), "Please add at least 2 entries")]';
  public addEntry = '//span[contains(text(), "Add Entry")]';
  public activityNameField = 'input[placeholder="Short Input"]';
  public totalYearsInvolved = 'input[placeholder="123"]';
  public listDescription = 'textarea[placeholder="Long Input"]';
  public addBtnInEntryPopup = '//div[@data-portal="true"]//span[contains(text(), "Add")]';
  public entryAdded = (entryName: string) => `//p[contains(text(), "${entryName}")]`;
  public schoolName = 'input[placeholder="Please enter the name of your current High School"]';
  public schoolAddress = 'input[placeholder="Enter high school street address"]';
  public schoolCity = 'input[name="contact.highSchoolCity"]';
  public schoolState = 'input[placeholder="Enter high school state"]';
  public schoolPostalCode = 'input[placeholder="e.g. 55413"]';
  public gpa = 'input[placeholder="Enter your current GPA"]';
  public graduationYear = 'input[placeholder="Enter a date"]';
  public uploadFileBtn = 'input[type="file"]';
  public essayCheckboxes = '#form-renderer div[role="group"] div[class*="mantine-Stack-root"] label';
  public checkBox = (name: string) => `//label[contains(text(), "${name}")]`;
  public essayTextBox = (textBoxName: string) =>
    `//label[contains(text(), "Essay about ${textBoxName}")]/following::textarea[@placeholder="Long Input"][1]`;
  public othersTextBox = `//label[contains(text(), "Provide an essay about any topic")]/following::textarea[@placeholder="Long Input"]`;
  public letsGetToKnow = `//span[contains(text(), "Lets get to know you!")]`;
  public extraCurricularActivities = `//span[contains(text(), "Extracurricular Activities")]`;
  public highSchoolInf = `//span[contains(text(), "High School")]`;
  public essay = `//span[contains(text(), "Essay")]`; //nth-1
  public valueInReviewPage = (fieldValue: any) => `//span[contains(text(), "${fieldValue}")]`;
  public paraInReviewPage = (fieldValue: any) => `//p[contains(text(), "${fieldValue}")]`;
  public submitApplicationBtn = '//button//p[contains(text(), "Submit")]';
  public removeAttachment = 'div[style="position: relative;"] button[aria-label="delete"]';
  public printApplication = '//p[contains(text(), "Print Application")]';

  async validateUserDetailsInApplication() {
    Log.info('Validate user details like Firstname, Lastname, Email address are auto populated');
    await expect(global.page.locator(this.firstName)).toHaveAttribute('value', FIRST_NAME);
    await expect(global.page.locator(this.lastName)).toHaveAttribute('value', LAST_NAME);
    expect(await global.page.locator(this.emailAdd).textContent()).toContainText(EMAIL_ID);
  }

  async enterAddressDetails() {
    await this.enterDataInField(this.streetAddress, ADDRESS, 'Address Details');
    await this.selectFromDropdown(this.state, this.stateName(STATE), 'State');
    await this.enterDataInField(this.city, CITY, 'City');
    await this.enterDataInField(this.zipcode, ZIPCODE, 'ZipCode');
    await this.selectFromDropdown(this.country, this.stateName(COUNTRY), 'Country');
  }

  async validateErrorMsgInExtraCurricPage() {
    Log.info('Validating error message if 2 Extra curricular activities are required');
    await this.clickAction(this.nextPage, 'Next Page');
    await this.waitForElementToBePresent(this.errorMsgExtraCurAct, 'Error message');
    await expect(global.page.locator(this.errorMsgExtraCurAct)).toBeVisible();
  }

  async enterAddExtraCurrAct(ActivityName: string, YearsInvolved: string, Leadership: string, Description: string) {
    await this.clickAction(this.addEntry, 'Add Entry');
    await this.enterDataInField(this.activityNameField, ActivityName, 'ExtraCurrActivity');
    await this.enterDataInField(this.totalYearsInvolved, YearsInvolved, 'Years Involved');
    await global.page.locator(this.listDescription).nth(0).fill(Leadership);
    await global.page.locator(this.listDescription).nth(1).fill(Description);
    await this.clickAction(this.addBtnInEntryPopup, 'Add');
    Log.info('Validate if entry is added');
    await expect(global.page.locator(this.entryAdded(ActivityName))).toBeVisible({ timeout: 80000 });
  }

  async enter2ExtraCurrActivities() {
    Log.info('Entering extra curricular activities');
    await this.enterAddExtraCurrAct(EC_ACTIVITY_1, YEARS_INVOLVED_1, LEADERSHIPROLES_1, DESCRIPTION_1);
    await this.enterAddExtraCurrAct(EC_ACTIVITY_2, YEARS_INVOLVED_2, LEADERSHIPROLES_2, DESCRIPTION_2);
    await this.enterAddExtraCurrAct(EC_ACTIVITY_3, YEARS_INVOLVED_3, LEADERSHIPROLES_3, DESCRIPTION_3);
    await this.enterAddExtraCurrAct(EC_ACTIVITY_4, YEARS_INVOLVED_4, LEADERSHIPROLES_4, DESCRIPTION_4);
  }

  async enterHighSchoolInfo() {
    Log.info('User enters high school information');
    if (!(await global.page.locator(this.schoolName).isVisible())) {
      await this.clickAction(this.nextPage, 'Next button');
      await this.waitForElementToBePresent(this.schoolName);
    }
    await this.enterDataInField(this.schoolName, SCHOOL_NAME, 'School Name');
    await this.enterDataInField(this.schoolAddress, SCHOOL_ADDRESS, 'School Address');
    await this.enterDataInField(this.schoolCity, SCHOOL_CITY, 'School City');
    await this.selectFromDropdown(this.schoolState, this.stateName(SCHOOL_STATE), 'School State');
    await this.enterDataInField(this.schoolPostalCode, SCHOOL_POSTAL, 'School Postal');
    await this.enterDataInField(this.graduationYear, YEAR_GRADUATION, 'Year Graduation');
    await this.enterDataInField(this.gpa, GPA, 'GPA');
  }

  async uploadTranscript() {
    const pathToTranscript = `src/data/My_School_Transcript.pdf`;
    Log.info('Path to transcript ' + pathToTranscript);
    await global.page.setInputFiles(this.uploadFileBtn, pathToTranscript);
    await this.waitForElementToBePresent(this.removeAttachment);
  }

  async validateEssayCheckbox() {
    Log.info('Validating essay checkbox functionality');
    if (!(await global.page.locator(this.essayCheckboxes).nth(0).isVisible())) {
      await this.clickAction(this.nextPage, 'Next button');
      await global.page.locator(this.essayCheckboxes).nth(0).waitFor();
    }
    const checkboxes = await global.page.$$(this.essayCheckboxes);
    for (let i = 0; i < checkboxes.length; i++) {
      const checkBoxName = await global.page.locator(this.essayCheckboxes).nth(i).textContent();
      await global.page.locator(this.essayCheckboxes).nth(i).click();
      await this.setTimeout(3000);
      if (await global.page.locator(this.essayTextBox(checkBoxName)).isVisible()) {
        expect(global.page.locator(this.essayTextBox(checkBoxName))).toBeVisible();
      } else {
        expect(global.page.locator(this.othersTextBox)).toBeVisible();
      }
      await global.page.locator(this.essayCheckboxes).nth(i).click();
      await this.setTimeout(3000);
    }
  }

  async enterEssay(checkBox: string) {
    Log.info('Enter essay for selected checkbox ' + checkBox);
    switch (checkBox) {
      case 'Cars':
        await this.enterDataInField(this.essayTextBox(checkBox), CARS, checkBox);
        break;
      case 'Animals':
        await this.enterDataInField(this.essayTextBox(checkBox), ANIMALS, checkBox);
        break;

      case 'School':
        await this.enterDataInField(this.essayTextBox(checkBox), SCHOOLS, checkBox);
        break;

      case 'Other':
        await this.enterDataInField(this.othersTextBox, OTHERS, checkBox);
        break;

      default:
        break;
    }
  }

  async selectCheckBoxEnterEssay(checkBoxName: string) {
    Log.info('Selecting the checkbox ' + checkBoxName);
    switch (checkBoxName) {
      case 'Cars':
        Log.info(`Selecting ${checkBoxName} checkbox`);
        await this.clickAction(this.checkBox(checkBoxName), checkBoxName);
        await this.enterEssay(checkBoxName);
        break;

      case 'Animals':
        Log.info(`Selecting ${checkBoxName} checkbox`);
        await this.clickAction(this.checkBox(checkBoxName), checkBoxName);
        await this.enterEssay(checkBoxName);
        break;

      case 'School':
        Log.info(`Selecting ${checkBoxName} checkbox`);
        await this.clickAction(this.checkBox(checkBoxName), checkBoxName);
        await this.enterEssay(checkBoxName);
        break;

      case 'Other':
        Log.info(`Selecting ${checkBoxName} checkbox`);
        await this.clickAction(this.checkBox(checkBoxName), checkBoxName);
        await this.enterEssay(checkBoxName);
        break;

      default:
        break;
    }
  }

  async userNavigatedToReviewPage() {
    Log.info('Validating if user is navigated to Review page');
    if (!(await global.page.locator(this.submitApplicationBtn).isVisible())) {
      await this.clickAction(this.nextPage, 'Next button');
      await global.page.locator(this.submitApplicationBtn).waitFor();
    }
    await expect(global.page.locator(this.submitApplicationBtn)).toBeVisible({ timeout: 80000 });
  }

  async validateValuesInReviewPage() {
    Log.info('Validating field values in Lets get to know section');
    await this.clickAction(this.letsGetToKnow, 'Lets get to know');
    await expect(global.page.locator(this.valueInReviewPage(FIRST_NAME))).toBeVisible();
    await expect(global.page.locator(this.valueInReviewPage(LAST_NAME))).toBeVisible();
    await expect(global.page.locator(this.paraInReviewPage(EMAIL_ID))).toBeVisible();
    await expect(global.page.locator(this.valueInReviewPage(FIRST_NAME))).toBeVisible();
    await expect(global.page.locator(this.valueInReviewPage(ADDRESS))).toBeVisible();
    await expect(global.page.locator(this.paraInReviewPage(STATE)).nth(0)).toBeVisible();
    await expect(global.page.locator(this.valueInReviewPage(CITY)).nth(0)).toBeVisible();
    await expect(global.page.locator(this.valueInReviewPage(ZIPCODE))).toBeVisible();
    await expect(global.page.locator(this.paraInReviewPage(COUNTRY)).nth(0)).toBeVisible();
    await this.clickAction(this.letsGetToKnow, 'Lets get to know');
    await this.setTimeout(2000);
    Log.info('Validating field values in Extra Curricular activity section');
    await this.clickAction(this.extraCurricularActivities, 'Extracurricular Activity');
    await expect(global.page.locator(this.valueInReviewPage(EC_ACTIVITY_1)).nth(0)).toBeVisible();
    await expect(global.page.locator(this.valueInReviewPage(EC_ACTIVITY_2)).nth(0)).toBeVisible();
    await this.clickAction(this.extraCurricularActivities, 'Extracurricular Activity');
    await this.setTimeout(2000);
    Log.info('Validating field values in High school info section');
    await this.clickAction(this.highSchoolInf, 'Highschool info');
    await expect(global.page.locator(this.valueInReviewPage(SCHOOL_NAME))).toBeVisible();
    await expect(global.page.locator(this.valueInReviewPage(SCHOOL_ADDRESS))).toBeVisible();
    await expect(global.page.locator(this.valueInReviewPage(SCHOOL_CITY)).nth(1)).toBeVisible();
    await expect(global.page.locator(this.paraInReviewPage(SCHOOL_POSTAL))).toBeVisible();
    await expect(global.page.locator(this.paraInReviewPage(YEAR_GRADUATION))).toBeVisible();
    await this.clickAction(this.highSchoolInf, 'Highschool info');
  }

  async validateApplicationSubmitted() {
    appSubmittedURL = await global.page.url();
    Log.info('Application submitted URL ' + appSubmittedURL);
    return appSubmittedURL;
  }

  async validateUserCannotEditApp() {
    Log.info('Validate user cannot edit submitted application');
    await expect(global.page.locator(this.submitApplicationBtn)).toBeDisabled();
  }
}
