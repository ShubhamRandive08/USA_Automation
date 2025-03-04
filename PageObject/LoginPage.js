const {test, expect} = require('@playwright/test')

exports.LoginPage = class LoginPage{
    /**
     * @param {import ('@playwright/test').Page} page
     */

    constructor(page){
        this.page = page

        // Element 
        this.popUp = page.locator(".auth-form-light")
        this.heading = page.locator(".auth-form-light > h4")
        this.username = page.locator("//input[@type = 'email']")
        this.password = page.locator("//input[@type = 'password']")
        this.button = page.locator("//input[@class = 'btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn']")
        this.createBtn = page.locator("//a[@id = 'create-user']")
        this.loginBtn = page.locator("//a[@id = 'ad-login']")
        this.adminUsername = page.locator("//input[@type = 'text']")
        // this.validComponent = page.locator("//span[@class = 'nav-profile-name']")

    }

    async goTo(){
        await this.page.goto(process.env.BASE_URL)
    }

    async validateComponents(){
        await expect(this.popUp).toBeVisible()
        await expect(this.heading).toBeVisible()
        await expect(this.username).toBeVisible()
        await expect(this.password).toBeVisible()
        await expect(this.button).toBeVisible()
        await expect(this.createBtn).toBeEnabled()
        await expect(this.loginBtn).toBeEnabled()
    }

    async teacherLogin(username,password,validateComponents){
        await this.username.click()
        await this.username.fill(username)
        await this.password.click()
        await this.password.fill(password)
        await this.button.click();
        await this.page.locator(`${validateComponents}`).waitFor();
        await expect(this.page.locator(`${validateComponents}`)).toBeVisible()
    }

    async adminLogin(username,password,validateComponents){
        await this.loginBtn.click()
        await this.adminUsername.click()
        await this.adminUsername.fill(username)
        await this.password.click()
        await this.password.fill(password)
        await this.button.click();
        await this.page.locator(`${validateComponents}`).waitFor();
        await expect(this.page.locator(`${validateComponents}`)).toBeVisible()
    }

}