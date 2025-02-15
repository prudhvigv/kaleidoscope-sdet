const reporter = require('cucumber-html-reporter');
import moment from 'moment';

import { htmlFolder } from '../conf/BaseClass';

const options = {
  theme: 'bootstrap',
  jsonFile: process.cwd() + '/built/src/JSON_Report/cucumber_report.json',
  output:
    process.cwd() +
    '/src/reports/html' +
    moment().format('DoMMMYYYY').toString() +
    '/' +
    htmlFolder +
    'cucumber_report.html',
  reportSuiteAsScenarios: true,
  ScenarioTimestamp: false,
  launchReport: false,
  storeScreenShots: true,

  metadata: {
    Project: 'Kaleodoscope Application Process',
  },
};

reporter.generate(options);
