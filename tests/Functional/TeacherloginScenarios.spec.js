const {test,expect} = require('@playwright/test')
const helper = require('../helper')
const UserLoginData = require('../test-data/UserLoginData.json');
const AdminLoginData = require('../test-data/AdminLoginData.json')
const {LoginPage} = require('../PageObject/LoginPage')

test.describe('Login Page Scenarios', () => {

    test.beforeEach(async ({page}) => {
        const loginpage = new LoginPage(page)
        await loginpage.goTo()
        await helper.validate(page)
    })

    test('Teacher Login scenarios',{
        tag : ['@functional']
    }, async ({ page }) => {
        await helper.loginWithWrongUsername(page, 'USER_1', "//span[@class = 'swal2-x-mark']");
        await helper.loginWithWrongPassword(page, 'USER_1', "//span[@class = 'swal2-x-mark']");
        await helper.noUsernamePassword(page, 'USER_1', "//div[@class = 'swal2-icon swal2-warning swal2-icon-show']");
        await helper.loginValidTeacher(page, 'USER_1', "//span[@class = 'nav-profile-name']");
    });
    

    test('Admin Login scenarios', async ({ page }) => {
        let loginpage = new LoginPage(page)
        await loginpage.adminLogin( AdminLoginData.worng_with_username.username,AdminLoginData.worng_with_username.password,"//span[@class = 'swal2-x-mark']");
        await loginpage.adminLogin(AdminLoginData.wrong_with_pass.username,AdminLoginData.wrong_with_pass.password,"//span[@class = 'swal2-x-mark']");
        await loginpage.adminLogin(AdminLoginData.assert_with_empty_field.username,AdminLoginData.assert_with_empty_field.password,"//div[@class = 'swal2-icon swal2-warning swal2-icon-show']");
        await loginpage.adminLogin(AdminLoginData.perfect_admin.username,AdminLoginData.perfect_admin.password ,"//div[@class = 'swal2-success-ring']");
    });
})
