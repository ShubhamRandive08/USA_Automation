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
        this.SearchBarOutput = page.locator("//td[@id='name']")
    }

    async goTo() {
        await this.page.goto(process.env.BASE_URL)
    }

    async validateSearchBar() {
        await this.searchBar.waitFor();
        await expect(this.searchBar).toBeVisible()
        await this.searchBar.click()
        await this.searchBar.fill("Manoj")
        await expect(this.SearchBarOutput).toHaveText("Manoj");
    }
}