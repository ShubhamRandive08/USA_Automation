const { test, expect } = require('@playwright/test')

exports.AdminPage = class AdminPage {
    /**
     * @param {import ('@playwright/test').Page} page
     */

    constructor(page) {
        // page instane
        this.page = page

        //Elements
        this.searchBar = page.locator("//input[@type='text']")
        this.SearchBarOutput = page.getByRole('cell', { name: 'Manoj' }).first()
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
}