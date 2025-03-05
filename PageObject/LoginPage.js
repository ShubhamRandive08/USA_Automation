const {test, expect} = require('@playwright/test')

exports.LoginPage = class LoginPage{
    /**
     * @param {import ('@playwright/test').Page} page
     */

    constructor(page){
        this.page = page

        // Element 
        // Login
        this.popUp = page.locator(".auth-form-light")
        this.heading = page.locator(".auth-form-light > h4")
        this.username = page.locator("//input[@type = 'email']")
        this.password = page.locator("//input[@type = 'password']")
        this.button = page.locator("//input[@class = 'btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn']")
        this.createBtn = page.locator("//a[@id = 'create-user']")
        this.loginBtn = page.locator("//a[@id = 'ad-login']")
        this.adminUsername = page.locator("//input[@type = 'text']")
        this.adminLoginBtn = page.locator("//button[@class='swal2-confirm swal2-styled']")

        //Register
        this.createBtn = page.locator("//a[@id='create-user']")
        this.heading = page.locator("//h3[@id='welcome']")
        this.name = page.locator("//input[@id='name']")
        this.email = page.locator("//input[@id='email']")
        this.username = page.locator("//input[@id='username']")
        this.password = page.locator("//input[@id='password']")
        this.signUpBtn = page.locator("//input[@class='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn']")
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

    // Login

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
        await expect(this.page.locator("//button[@class='swal2-confirm swal2-styled']")).toBeVisible();
        await this.adminLoginBtn.click()
        // await this.page.waitForTimeout(5000)
    }

    // Register
    async  registerTeacher(name,email,username,password,validateComponent,clickBtn) {
        await expect(this.createBtn).toBeVisible()
        await this.createBtn.click()
        await expect(this.heading).toBeVisible()
        await expect(this.name).toBeVisible()
        await this.name.click()
        await this.name.fill(name)
        await expect(this.email).toBeVisible()
        await this.email.click()
        await this.email.fill(email)
        await expect(this.username).toBeVisible()
        await this.username.click()
        await this.username.fill(username)
        await expect(this.password).toBeVisible()
        await this.password.click()
        await this.password.fill(password)
        await expect(this.signUpBtn).toBeVisible()
        await this.signUpBtn.click()
        await expect(this.page.locator(`${validateComponent}`)).toBeVisible()
        await expect(this.page.locator(`${clickBtn}`)).toBeVisible()
        await this.page.waitForTimeout(1000)
        await this.page.locator(`${clickBtn}`).click()
    }
}