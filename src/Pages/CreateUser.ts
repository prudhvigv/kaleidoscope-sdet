import { BaseClass } from '../conf/BaseClass';
import { USER_DETAILS } from '../data/userDetails.json';

const FIRST_NAME = USER_DETAILS.FIRST_NAME;
const LAST_NAME = USER_DETAILS.LAST_NAME;
const COUNTRY_CODE = USER_DETAILS.COUNTRY_CODE;
const MOBILE_NO = USER_DETAILS.MOBILE_NO;
const PASSWORD = USER_DETAILS.PASSWORD;

export class CreateUser extends BaseClass {
  public firstName = 'input[aria-label="First Name"]';
  public lastName = 'input[aria-label="Last Name"]';
  public countryCodeDropdown = 'div[class="flag-dropdown "]';
  public countryCodeOption = code =>
    `//li[@class="country"]//span[contains(text(), "India")]/following::span[contains(text(), "${code}")]`;
  public mobileNumber = 'input[type="tel"]';
  public password = 'input[type="password"]';
  public confirmAgeCheckbox = 'input[aria-label="I confirm that I am at least 13 years old"]';
  public submitBtn = 'button[aria-label="Submit"]';
  public signInBtn = 'button[aria-label="Sign In"]';

  async selectCountryCode(code: any) {
    await this.clickAction(this.countryCodeDropdown, 'Country code');
    await this.setTimeout(2000);
    await this.clickAction(this.countryCodeOption(code), code);
    await this.setTimeout(3000);
  }

  async enterCreateUserData() {
    await this.enterDataInField(this.firstName, FIRST_NAME, 'First Name');
    await this.enterDataInField(this.lastName, LAST_NAME, 'Last Name');
    await this.selectCountryCode(COUNTRY_CODE);
    await this.enterDataInField(this.mobileNumber, MOBILE_NO, 'Mobile Number');
    await this.enterDataInField(this.password, PASSWORD, 'Password');
  }

  async selectAgeConfirm() {
    await this.clickAction(this.confirmAgeCheckbox, 'Confirm over 13 years of age');
  }

  async clickSubmitBtn() {
    await this.clickAction(this.submitBtn, 'Submit');
  }
}
