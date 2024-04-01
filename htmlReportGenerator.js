const reporter = require('cucumber-html-reporter')

var date = new Date();
var currentDate = date.getDate() + '_'+ (date.getMonth()+1) + '_'+ date.getHours() + '_'+date.getMinutes();

var options = {
    brandTitle: 'demo test scenarios',
    theme: 'bootstrap',
    jsonFile: 'Reports/cucumber_report.json',
    output: 'Reports/cucumber_report_'+currentDate+'.html',
    screenshotDirectory: './Screenshots/',
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Verions" : "1.1.1",
        "Test Environment" : "QA"
    }
}

reporter.generate(options);