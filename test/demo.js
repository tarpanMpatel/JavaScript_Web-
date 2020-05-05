const expect = require('chai').expect;
const assert = require('chai').assert;
//import {describe} from "mocha";

//const {assert} = chai
//const {expect} = require('chai')

const {Builder, By, until} = require('selenium-webdriver');

let URL = 'https://commerceos.staging.devpayever.com/'

describe('Web Testing', function () {
    this.timeout(20000);

   const driver = new Builder().forBrowser('chrome').build();
    console.log("Driver Open successfully")


    it('should open the selenium website and check the title', async function () {

      // await driver.manage().setTimeouts( { implicit: 10000 } )

        await driver.get(URL);
		driver.manage().window().maximize();
        console.log("Website open successfully");
        await driver.manage().setTimeouts( { implicit: 15000 } )
        const title = await driver.getTitle();
        console.log("Actual Title : " + title);
      // expect(title).to.equal('SeleniumHQ Browser Automation');
		let username = driver.findElement(By.xpath('//input[@name=\'UserName\']'));
		assert.equal(await username.isDisplayed(),true,"Element Displated..");
		
        assert.equal(title,'payever',"Title Match Successfully");
        console.log("Title verified successfully");
		
		await username.sendKeys('aqa@payever.org');
		await driver.findElement(By.xpath('//input[@placeholder=\'Password\']')).sendKeys('Aqacool123!');
		await driver.sleep(2000);
		await driver.findElement(By.xpath('//button//div[contains(.,\'Login\')]')).click();
		

    });

    it('should about button is clickable.', async function () {

        await driver.findElement(By.className('arrow-down')).click();
        console.log("Clicked on About option.");
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//header[@id=\'header\']//div[4]')).click();
        console.log("Clicked on History option.");
        await driver.sleep(2000)
        const title = await driver.getTitle();
        console.log("Actual Title : " + title);
        expect(title).to.equal('Selenium History');
        console.log("Title verified successfully");

    });

    after('Closing Driver', async function () {
        await driver.quit()
        console.log("Driver Quit successfully")

    });
});