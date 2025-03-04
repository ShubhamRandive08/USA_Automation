const { test, expect } = require('@playwright/test')
const helper = require('../helper')
const { LoginPage } = require('../PageObject/LoginPage')
const { LogoutPage } = require('../PageObject/LogoutPage')

let loginpage;
let logoutpage;

test.describe('Validate Logout Function', async () => {
    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        logoutpage = new LogoutPage(page)
        await loginpage.goTo()
        await helper.validate(page)
    })

// Test cases for teacher logout process
    test('Validate Teacher Dashboard Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logout("󰋜 Dashboard")
    })

    test('Validate Teacher New Admission Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logoutToggle("󰝦 NEW ADDMISSION 󰅀", "New Student")
    })
    
    test('Validate Teacher STAFF Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logoutToggle("󰕱 STAFF 󰅀", "Staff Member")
    })
    test('Validate Teacher STUDENT LIST Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logoutToggle("󰄫 STUDENT LIST 󰅀", "󰄫 STUDENT LIST 󰅀")
    })

    test('Validate Teacher Events Logout Function', async ({ page }) => {
        await helper.loginValidTeacher(page, "//span[@class = 'nav-profile-name']")
        await logoutpage.logout("󰃳 Events")
    })

// Test cases for the admin logout process
    test('Validate Admin Dashboard Logout Function', async ({page}) => {
        await helper.loginValidAdmin(page,"//div[@class = 'swal2-success-ring']")
        await logoutpage.logout("󰋜 Dashboard")
    })

    test('Validate Admin Saff Logout Function', async ({page}) => {
        await helper.loginValidAdmin(page,"//div[@class = 'swal2-success-ring']")
        await logoutpage.logoutToggle("󰕱 STAFF 󰅀", "Staff Member")
    })

    test('Validate Admin Add Events Logout Function', async ({page}) => {
        await helper.loginValidAdmin(page,"//div[@class = 'swal2-success-ring']")
        await logoutpage.logout("Add Events")
    })

    test('Validate Admin Added Events Logout Function', async ({page}) => {
        await helper.loginValidAdmin(page,"//div[@class = 'swal2-success-ring']")
        await logoutpage.logout("Added Events")
    })

    test('Validate Admin Publish Reports Logout Function', async ({page}) => {
        await helper.loginValidAdmin(page,"//div[@class = 'swal2-success-ring']")
        await logoutpage.logout("Publish Reports")
    })

})