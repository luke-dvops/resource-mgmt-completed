const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const fs = require('fs').promises;

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
var server;
var counter = 0;

before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});
describe('Testing Login UI', function () {
    it('Should have the correct title', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        this.timeout(100000); // Set timeout as 10 seconds
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('DVOPS - Resource Management Web App');
    });

    it('Should show error message - All fields required', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        await driver.get(baseUrl);
        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@gmail.com');
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        // Locate the error element and retrieve its text
        const errorMessage = await driver.findElement(By.id('error')).getText();
        // Assert that the error message contains the expected text
        expect(errorMessage).to.equal('All fields are required!');
    });


    it('Should show error message - Invalid credentials', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        await driver.get(baseUrl);
        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@gmail.com');
        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click(); // Click on the element
        await passwordElement.sendKeys('abcdef');
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        // Locate the error element and retrieve its text
        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');
        // Assert that the error message contains the expected text and style
        expect(errorMessage).to.equal('Invalid credentials!');
        expect(errorStyle).to.equal('text-danger');
    });

});

describe('Testing Register UI', function () {
    it('Should show error message - Password does not match', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/register.html';
        await driver.get(baseUrl);
        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('paul@gmail.com');
        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click(); // Click on the element
        await passwordElement.sendKeys('123456');
        // Locate and interact with the confirm password field
        const confirmPasswordElement = await driver.findElement(By.id('confirmPassword'));
        await confirmPasswordElement.click(); // Click on the element
        await confirmPasswordElement.sendKeys('1234');
        // Locate and interact with the Register button
        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();
        // Locate the error element and retrieve its text
        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');
        // Assert that the error message contains the expected text and style
        expect(errorMessage).to.equal('Password does not match!');
        expect(errorStyle).to.equal('text-danger');
    });
    it('Should clear textboxes when Reset is clicked', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/register.html';
        await driver.get(baseUrl);
        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('paul@gmail.com');
        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await emailElement.click(); // Click on the element
        await passwordElement.sendKeys('123456');
        // Locate and interact with the confirm password field
        const confirmPasswordElement = await driver.findElement(By.id('confirmPassword'));
        await confirmPasswordElement.click(); // Click on the element
        await confirmPasswordElement.sendKeys('1234');
        // Locate and interact with the Reset button
        const resetButton = await driver.findElement(By.xpath('//button[text()="Reset"]'));
        await resetButton.click();
        // Locate the error element and retrieve its text
        const emailText = await emailElement.getText();
        const passwordText = await passwordElement.getText();
        const confirmPasswordText = await confirmPasswordElement.getText();
        // Assert that the etextboxes are all empty
        expect(emailText).to.equal('');
        expect(passwordText).to.equal('');
        expect(confirmPasswordText).to.equal('');
    });
});

describe('Testing Resource UI', function () {
    it('Should be able to add and display new resource', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        await driver.get(baseUrl);
        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@gmail.com');
        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click(); // Click on the element
        await passwordElement.sendKeys('123456');
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);
        // Assert that the URL matches the expected URL
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/instrumented/home.html');
        // Locate and interact with the Login button
        const addButton = await driver.findElement(By.xpath("//div[@class='col-md-2']//button[contains(text(), 'Add Resource')]"));
        await addButton.click();
        // Wait for the modal to load
        const resourceModal = await driver.findElement(By.id('resourceModal'));
        await driver.wait(until.elementIsVisible(resourceModal), 5000);
        // Locate and interact with the name field
        const rNameElement = await driver.findElement(By.id('name'));
        await rNameElement.click(); // Click on the element
        await rNameElement.sendKeys('Monitor');
        // Locate and interact with the location field
        const rLocElement = await driver.findElement(By.id('location'));
        await rLocElement.click(); // Click on the element
        await rLocElement.sendKeys('Blk 3 Lvl 5 Lab 5');
        // Locate and interact with the description field
        const rDescElement = await driver.findElement(By.id('description'));
        await rDescElement.click(); // Click on the element
        await rDescElement.sendKeys('Project purpose');
        // Locate the table element and locate all tr within table
        const tableBefore = await driver.findElement(By.tagName('table')); // Replace with theactual ID of your table
        const rowsBefore = await tableBefore.findElements(By.tagName('tr'));
        const beforeCount = rowsBefore.length
        // Locate and interact with the Login button
        const addButtonModal = await driver.findElement(By.xpath("//div[@class='modal-footer']//button[contains(text(), 'Add Resource')]"));
        await addButtonModal.click();
        // Wait for the modal to dismiss
        await driver.manage().setTimeouts({ implicit: 5000 });
        // Locate the table element and locate all tr within table
        const tableUpdated = await driver.findElement(By.tagName('table'));
        const rowsUpdated = await tableUpdated.findElements(By.tagName('tr'));
        // Assert that the table rows increased by 1
        expect(rowsUpdated.length).to.equal(beforeCount + 1);
    });
});

afterEach(async function () {
    await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
        if (coverageData) {
            // Save coverage data to a file
            await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
                JSON.stringify(coverageData), (err) => {
                    if (err) {
                        console.error('Error writing coverage data:', err);
                    } else {
                        console.log('Coverage data written to coverage.json');
                    }
                });
        }
    });
});



after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});