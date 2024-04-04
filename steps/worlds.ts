import { Before, After, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";

let page: Page
let browser: Browser

setDefaultTimeout(60000)

Before(async function(){
    try{
        browser = await chromium.launch({headless: true})
        const context = await browser.newContext();
        page = await context.newPage();

        await page.goto('https://www.demoblaze.com')
        console.log(`Capture site titles as ${await page.title()}`)
    }
    catch(error){
        console.log('chrome navigation to demo site failed')
        throw new Error('chrome navigation to demo site failed')
    }

})

After(async function(Scenario){
    if(Scenario.result!.status === Status.FAILED){
        await this.attach(await page.screenshot({path: `./Screenshot/${Scenario.pickle.name}.png`, fullPage: true}),"image/png");
    }
    await browser.close()
})

export {page, browser};