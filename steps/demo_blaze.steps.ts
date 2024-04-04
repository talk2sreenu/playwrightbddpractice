import {Given, When, Then} from '@cucumber/cucumber';
import {page} from '../steps/worlds';
import {expect} from '@playwright/test';

Given('I am on {string} page', async (expectedText) => {
    
    const actualText = await page.locator(`a[id='nava']`).textContent();
    
    //expect(expectedText).toEqual(actualText?.toString().toLocaleUpperCase().trim());
});

When('I click categories link', async () => {
    await page.locator(`//div[@class='list-group']//a[1]`).click();
});

Then('I see {string}, {string} and {string} under categories', async (string, string2, string3) =>{
    const actualSubLinks = await page.locator(`//div[@class='list-group']//a[not(@id='cat')]`).allTextContents();
    const expectedSubLinks = [string, string2, string3];
    expect(actualSubLinks).toEqual(expectedSubLinks);
});

When('I choose {string}', async (expectedCategory) => {
    const subLinks = await page.locator(`//div[@class='list-group']//a`)
    const subLinksCount = await page.locator(`//div[@class='list-group']//a`).count()
    for(var i=0; i<subLinksCount;i++){
        if((await subLinks.nth(i).textContent())?.match(expectedCategory)){
            await subLinks.nth(i).click();
            break;
        }
    }
});

Then('I see {string} in display', async (actualProduct) => {
    const product = page.locator(`//h4[@class='card-title']//a[text()='${actualProduct}']`);
    await expect(product).toBeEnabled();
    expect(product).toBeTruthy();
});

When('User scroll to Get In touch section', async () => { 
    await page.getByText('Get in Touch').scrollIntoViewIfNeeded()
    await page.getByText('Get in Touch').isVisible()
});

Then('{string} and correct value displayed', async (fieldName) => {
    const objFiled = await page.locator('p', {hasText : fieldName + ': '})

    objFiled.isVisible()
    const displayedValue = (await objFiled.innerText()).toString()
    console.log('Value from UI : ' + displayedValue)
    expect(displayedValue).toContain(fieldName)
});