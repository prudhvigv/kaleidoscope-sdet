const common = `
-f json:built/src/JSON_Report/cucumber_report.json
--require-module ts-node/register
--require src/StepDefinitions/**/*.ts
--require src/Pages/**/*.ts
--publish-quiet
`

module.exports = {
    default: `${common}`
}