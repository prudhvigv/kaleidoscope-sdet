import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import moment = require('moment');
import { chromium } from 'playwright';
import { Log } from './src/util/Log';

const launchBrowser = process.env.BROWSER || 'CHROME';

setDefaultTimeout(80 * 1000);

BeforeAll(async () => {
  const jsonFolder = process.cwd() + '/src/JSON_Report';
  Log.info('Launch Browser');
  switch (launchBrowser) {
    case 'CHROME':
      Log.info('Launching chrome browser');
      global.browser = await chromium.launch({
        args: ['--start-maximized'],
        channel: 'chrome',
        headless: false,
      });
      break;

    case 'CHROMIUM':
      Log.info('Launching chromium browser');
      global.browser = await chromium.launch({
        args: ['--start-maximized'],
        headless: false,
      });
      break;

    default:
      break;
  }
  global.context = await global.browser.newContext({ viewport: null });
  global.page = await global.context.newPage();
  Log.info('-----------' + moment().format('MMMM Do YYYY, h:mm:ss a').toString() + '-----------');
});

AfterAll(async () => {
  await global.page.close();
  await global.context.close();
  await global.browser.close();
  Log.info('------------All tests has been completed--------------');
});

Before(async scenario => {
  Log.info(
    `Feature Name is ${scenario.gherkinDocument.feature?.name} >>>> Time: ${moment()
      .format('MMMM Do YYYY, h:mm:ss a')
      .toString()}`,
  );
  Log.info(`Scenario name is ${scenario.pickle.name}`);
  const fetchedFeature = scenario.pickle.uri.toString();
  const splitFeature = fetchedFeature.split('\\');
  Log.info('Fetched feature path is ' + fetchedFeature);
  Log.info('Fetched feature name is ' + splitFeature[3]);
});

After(async function (scenario) {
  const except = 'exception';
  const stackError = 'stack';
  if (scenario.result?.status === Status.FAILED) {
    Log.info('Case Failed');
    const screenshot = await global.page.screenshot();
    this.attach(screenshot, 'image/png');
    try {
      console.log(
        'Script trace logs: '
          .concat('\n')
          .concat('---------')
          .concat('\n')
          .concat(scenario.result[except][stackError])
          .concat('\n'),
      );
    } catch (e) {}
  }
});
