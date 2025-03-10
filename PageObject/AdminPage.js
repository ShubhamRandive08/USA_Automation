const { test, expect } = require('@playwright/test')
const { LogoutPage } = require('../PageObject/LogoutPage')
const { LoginPage } = require('./LoginPage')
const AdminLoginData = require('../test-data/AdminLoginData.json')
const UserLoginData = require('../test-data/UserLoginData.json')

exports.AdminPage = class AdminPage {
    /**
     * @param {import ('@playwright/test').Page} page
     */

    constructor(page) {
        // page instane
        this.page = page
        this.logoutpage = new LogoutPage(page)
        this.loginpage = new LoginPage(page)

        //Elements
        this.searchBar = page.locator("//input[@type='text']")
        this.SearchBarOutput = page.getByRole('cell', { name: 'teststudent1' }).first()

        // Locked Status elements
        this.error = page.locator('//div[@class="swal2-icon swal2-error swal2-icon-show"]')
        this.errorTxt = page.locator('//div[@id="swal2-html-container"]') // Your Profile Has Been Locked. Please Contact with ADMIN.
        this.okBtn = page.locator('//button[@class="swal2-confirm swal2-styled"]')

        // Success status
        this.success = page.locator('//div[@class="swal2-success-ring"]')
        this.successTxt = page.locator('//h2[@class="swal2-title"]')
        this.afterSuccess = page.locator('//span[@class="nav-profile-name"]')

        // lock, unloack btn
        this.btn = page.locator('//input[@type="button"]')

    }

    async goTo() {
        await this.page.goto(process.env.BASE_URL)
    }

    async validateSearchBar() {
        await this.searchBar.waitFor();
        await expect(
            this.searchBar
        ).toBeVisible()
        await this.searchBar.click()
        await this.searchBar.fill("teststudent1")
        await expect(
            this.SearchBarOutput
        ).toHaveText("teststudent1");
    }

    async validateTeacherStatus() {
        await this.page.waitForTimeout(2000)
        await expect(
            this.page.getByRole('link', { name: `󰕱 STAFF 󰅀` })
        ).toBeVisible()
        await this.page.getByRole('link', { name: `󰕱 STAFF 󰅀` }).click();

        await expect(
            this.page.getByRole('link', { name: `Staff Member`, exact: true })
        ).toBeVisible()
        await this.page.getByRole('link', { name: `Staff Member`, exact: true }).click()

        await this.page.waitForSelector('#dt > tr > td', { state: 'visible' });

        const status = await this.page.locator('#dt > tr > td').nth(2).textContent();
        console.log(`Status verified as ${status} `)

        const currentStatus = await status.trim().toLowerCase();

        // code for take status and perform a permission operation is successful or not

        if (currentStatus === 'unlock') {
            await this.logoutpage.onlyLogout()

            await this.loginpage.teacherValidLogin(
                UserLoginData.USER_1.perfect_user.username,
                UserLoginData.USER_1.perfect_user.password,
                "//span[@class = 'nav-profile-name']"
            )

            await expect(
                this.success
            ).toBeVisible()
            await expect(
                this.successTxt
            ).toHaveText('🚀 Login Successful!')
            await expect(
                this.okBtn
            ).toBeVisible()
            await this.okBtn.click()

            await expect(
                this.afterSuccess
            ).toBeVisible()
        } else {
            await this.logoutpage.onlyLogout()

            await this.loginpage.teacherValidLogin(
                UserLoginData.USER_1.perfect_user.username,
                UserLoginData.USER_1.perfect_user.password,
                "//span[@class = 'nav-profile-name']"
            )
            await expect(
                this.error
            ).toBeVisible()
            await expect(
                this.errorTxt
            ).toHaveText('Your Profile Has Been Locked. Please Contact with ADMIN.')
            await expect(
                this.okBtn
            ).toBeVisible()
            await this.okBtn.click()
            await this.loginpage.adminLogin(
                AdminLoginData.perfect_admin.username,
                AdminLoginData.perfect_admin.password,
                "//div[@class = 'swal2-success-ring']"
            )

            await expect(
                this.page.getByRole('link', { name: `󰕱 STAFF 󰅀` })
            ).toBeVisible()
            await this.page.getByRole('link', { name: `󰕱 STAFF 󰅀` }).click();

            await expect(
                this.page.getByRole('link', { name: `Staff Member`, exact: true })
            ).toBeVisible()
            await this.page.getByRole('link', { name: `Staff Member`, exact: true }).click()

            await expect(
                this.btn.first()
            ).toBeVisible()
            await this.btn.first().click()
            await expect(
                this.page.locator('//button[@class="swal2-confirm swal2-styled swal2-default-outline"]')
            ).toBeVisible();
            await this.page.locator('//button[@class="swal2-confirm swal2-styled swal2-default-outline"]').click();
            await this.okBtn.click()


            await this.logoutpage.onlyLogout()
            await this.loginpage.teacherValidLogin(
                UserLoginData.USER_1.perfect_user.username,
                UserLoginData.USER_1.perfect_user.password,
                "//span[@class = 'nav-profile-name']"
            )
            await expect(
                this.success
            ).toBeVisible()
            await expect(
                this.successTxt
            ).toHaveText('🚀 Login Successful!')
            await expect(
                this.okBtn
            ).toBeVisible()
            await this.okBtn.click()

            await expect(
                this.afterSuccess
            ).toBeVisible()


            await this.page.waitForTimeout(2000)
        }
    }
}