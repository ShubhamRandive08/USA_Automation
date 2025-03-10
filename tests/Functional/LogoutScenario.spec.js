const { test, expect } = require('@playwright/test')
const helper = require('../../helper')
const { LoginPage } = require('../../PageObject/LoginPage')
const { LogoutPage } = require('../../PageObject/LogoutPage')
// import {LoginPage} from ('../../PageObjectLiginPage')

let loginpage;
let logoutpage;

test.describe('Validate Logout Function',{
    tag : ['@functional']
}, async () => {
    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        logoutpage = new LogoutPage(page)
        await loginpage.goTo()
        await helper.validate(page)
    })

    // Test cases for teacher logout process
    test('Validate Teacher Dashboard Logout Function', async ({ browserName,page }) => {
    if (browserName !== 'chromium') test.skip();

        const actions = [
            ["󰋜 Dashboard"],
            ["󰝦 NEW ADDMISSION 󰅀", "New Student"],
            ["󰕱 STAFF 󰅀", "Staff Member"],
            ["󰄫 STUDENT LIST 󰅀", "Student List"],
            ["󰃳 Events"]
        ];

        for (const action of actions) {
            await helper.loginValidTeacher(page, 'USER_1', "//span[@class = 'nav-profile-name']");
            if (action.length === 1) {
                await logoutpage.logout(action[0]);
            } else {
                await logoutpage.logoutToggle(action[0], action[1]);
            }
        }
        await page.close()
    });

    // Test cases for the admin logout process
    test('Validate Admin Dashboard Logout Function', async ({ browserName,page }) => {
    if (browserName !== 'chromium') test.skip();

        const actions = [
            { type: 'logout', menu: "󰋜 Dashboard" },
            { type: 'logoutToggle', menu: "󰕱 STAFF 󰅀", subMenu: "Staff Member" },
            { type: 'logout', menu: "Add Events" },
            { type: 'logout', menu: "Added Events" },
            { type: 'logout', menu: "Publish Reports" }
        ];

        for (const action of actions) {
            await helper.loginValidAdmin(page, "//div[@class = 'swal2-success-ring']");

            if (action.type === 'logout') {
                await logoutpage.logout(action.menu);
            } else {
                await logoutpage.logoutToggle(action.menu, action.subMenu);
            }
        }
        await page.close()
    });
})