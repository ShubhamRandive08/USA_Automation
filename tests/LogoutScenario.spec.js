const { test, expect } = require('@playwright/test')
const helper = require('../helper')
const { LoginPage } = require('../PageObject/LoginPage')
const { LogoutPage } = require('../PageObject/LogoutPage')

let loginpage;
let logoutpage;

test.describe('Validate Logout Function', async () => {

    test.afterAll(async ({page}) => {
        await page.close()
    })

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        logoutpage = new LogoutPage(page)
        await loginpage.goTo()
        await helper.validate(page)
    })
    test('Validate Dashboard Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logout("󰋜 Dashboard")
    })

    // 1) <span class="menu-title">Dashboard</span> aka getByRole('link', { name: '󰋜 Dashboard' })
    // 2) <span class="menu-title">NEW ADDMISSION</span> aka getByRole('link', { name: '󰝦 NEW ADDMISSION 󰅀' })
    // 3) <span class="menu-title">STAFF</span> aka getByRole('link', { name: '󰕱 STAFF 󰅀' })
    // 4) <span class="menu-title">STUDENT LIST</span> aka getByRole('link', { name: '󰄫 STUDENT LIST 󰅀' })
    // 5) <span class="menu-title">Events</span> aka getByRole('link', { name: '󰃳 Events' })

    test('Validate New Admission Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logoutToggle("󰝦 NEW ADDMISSION 󰅀", "New Student")
    })
    
    test('Validate STAFF Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logoutToggle("󰕱 STAFF 󰅀", "Staff Member")
    })
    test('Validate STUDENT LIST Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logoutToggle("󰄫 STUDENT LIST 󰅀", "󰄫 STUDENT LIST 󰅀")
    })

    test('Validate Events Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logout("󰃳 Events")
    })

})