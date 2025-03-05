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
        this.createBtnRagister = page.locator("//a[@id='create-user']")
        this.headingRegister = page.locator("//h3[@id='welcome']")
        this.nameRagister = page.locator("//input[@id='name']")
        this.emailRagister = page.locator("//input[@id='email']")
        this.usernameRagister = page.locator("//input[@id='username']")
        this.passwordRagister = page.locator("//input[@id='password']")
        this.signUpBtnRagister = page.locator("//input[@class='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn']")
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
        await expect(this.createBtnRagister).toBeVisible()
        await this.createBtnRagister.click()
        await expect(this.headingRegister).toBeVisible()
        await expect(this.nameRagister).toBeVisible()
        await this.nameRagister.click()
        await this.nameRagister.fill(name)
        await expect(this.emailRagister).toBeVisible()
        await this.emailRagister.click()
        await this.emailRagister.fill(email)
        await expect(this.usernameRagister).toBeVisible()
        await this.usernameRagister.click()
        await this.usernameRagister.fill(username)
        await expect(this.passwordRagister).toBeVisible()
        await this.passwordRagister.click()
        await this.passwordRagister.fill(password)
        await expect(this.signUpBtnRagister).toBeVisible()
        await this.signUpBtnRagister.click()
        await expect(this.page.locator(`${validateComponent}`)).toBeVisible()
        await expect(this.page.locator(`${clickBtn}`)).toBeVisible()
        await this.page.waitForTimeout(1000)
        await this.page.locator(`${clickBtn}`).click()
    }
}