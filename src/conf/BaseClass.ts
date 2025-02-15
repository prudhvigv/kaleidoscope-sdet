import * as fs from 'fs';
import moment from 'moment';
import { Log } from '../util/Log';

const format = 'DoMMMYYYY';
const debug = '';

export const htmlFolder = process.ppid;

export class BaseClass {
  constructor() {
    this.createReportDirectory();
    this.getJSONReportDir();
  }

  replaceBackSlashToFrontSlash(str: string): string {
    const strng = str.match(/[^\\]+/gi) as RegExpMatchArray;
    const sr = strng.join('/');
    return sr;
  }

  createReportDirectory(): string {
    const folder = moment().format(format).toString();

    const reportsDir = this.replaceBackSlashToFrontSlash(process.cwd()) + '/src/reports';
    Log.info('Directory: ' + reportsDir);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
      Log.info('Reports directory created: ' + reportsDir);
    }
    const htmlDir = this.replaceBackSlashToFrontSlash(process.cwd()) + '/src/reports/HTML' + folder;
    if (!fs.existsSync(htmlDir)) {
      fs.mkdirSync(htmlDir);
      Log.info('HTML directory created: ' + htmlDir);
    }
    return folder;
  }

  getJSONReportDir(): string {
    const jsonFolder = process.cwd() + debug + '/built/src/JSON_Report';
    if (!fs.existsSync(jsonFolder)) {
      fs.mkdirSync(jsonFolder, { recursive: true });
      Log.info('JSON_Report directory created: ' + jsonFolder);
    }
    return jsonFolder;
  }

  getDate(noOfDays: number): Date {
    const date: Date = new Date();
    date.setDate(date.getDate() - noOfDays);
    return date;
  }

  async setTimeout(timeout: number) {
    Log.info(`>>>>Waiting ${timeout} timeout`);
    await global.page.waitForTimeout(timeout);
  }

  async clickAction(locator: string, elemName: string = '') {
    Log.info(`Clicking on ${elemName}`);
    await global.page.locator(locator).waitFor();
    await global.page.locator(locator).click();
    Log.info(`Clicked on ${elemName}`);
  }

  async enterDataInField(locator: string, data: string, fieldName: string = '') {
    Log.info(`Entering ${data} in field ${fieldName}`);
    await global.page.locator(locator).waitFor();
    await global.page.locator(locator).fill('');
    await global.page.locator(locator).fill(data);
  }

  async waitForElementToBePresent(locator: string, elemName: string = '') {
    Log.info(`Waiting for element ${elemName}`);
    await global.page.locator(locator).waitFor();
  }

  async selectFromDropdown(field: string, option: string, elemName: string = '') {
    Log.info(`Selecting ${option} from ${field} from ${elemName}`);
    await this.waitForElementToBePresent(field, elemName);
    await this.clickAction(field);
    await global.page.locator(option).nth(0).waitFor();
    await global.page.locator(option).nth(0).click();
    Log.info(`Selected ${option} from ${elemName}`);
  }
}
