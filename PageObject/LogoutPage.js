const {test,expect} = require('@playwright/test')

exports.LogoutPage = class LogoutPage{
    /**
     * @param {import ('@playwright/test').Page} page
     */

    constructor(page){
        this.page = page

        //Elements
        this.logoutNameBtn = page.locator("//a[@class='nav-link dropdown-toggle']")
        this.logoutBtn = page.locator("//a[@class='dropdown-item']")
        this.logoutText = page.locator("//h2[@class = 'swal2-title text-info']")
        this.logoutConfirmBtn = page.locator("//button[@class='swal2-confirm btn btn-success swal2-styled swal2-default-outline']")
        this.logoutCancleBtn = page.locator("//button[@class = 'swal2-cancel btn btn-danger swal2-styled swal2-default-outline']")
        this.validateCancle = page.locator("//span[@class='nav-profile-name']")
        this.validateLogout = page.locator("//input[@class = 'btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn']")
    }



    async logout(logoutPage){
        await this.page.getByRole('link', { name: `${logoutPage}` }).click();
        await expect(this.page.getByRole('link', { name: `${logoutPage}` })).toBeVisible()
        await expect(this.logoutNameBtn).toBeVisible();
        await this.logoutNameBtn.click();
        await expect(this.logoutBtn).toBeVisible()
        await this.logoutBtn.click()
        await expect(this.logoutText).toHaveText("Are you sure you want to logout?")
        await expect(this.logoutConfirmBtn).toBeVisible()
        await expect(this.logoutCancleBtn).toBeVisible()
        await this.logoutCancleBtn.click()
        await this.logoutNameBtn.click();
        await this.logoutBtn.click()
        await this.logoutConfirmBtn.click()
        await expect(this.validateLogout).toBeVisible()
    }

    async logoutToggle(logoutPage, toggleLocator){
        await this.page.getByRole('link', { name: `${logoutPage}` }).click();
        await expect(this.page.getByRole('link', { name: `${logoutPage}` })).toBeVisible()
        await expect(this.page.getByRole('link', { name: `${toggleLocator}` })).toBeVisible()
        await this.page.getByRole('link', { name: `${toggleLocator}` }).click()
        await expect(this.logoutNameBtn).toBeVisible();
        await this.logoutNameBtn.click();
        await expect(this.logoutBtn).toBeVisible()
        await this.logoutBtn.click()
        await expect(this.logoutText).toHaveText("Are you sure you want to logout?")
        await expect(this.logoutConfirmBtn).toBeVisible()
        await expect(this.logoutCancleBtn).toBeVisible()
        await this.logoutCancleBtn.click()
        await this.logoutNameBtn.click();
        await this.logoutBtn.click()
        await this.logoutConfirmBtn.click()
        await expect(this.validateLogout).toBeVisible()
    }
}