const {test,expect} = require('@playwright/test');
const helper = require('../helper')
const { LoginPage } = require('../PageObject/LoginPage');
const { AdminPage } = require('../PageObject/AdminPage');

let loginpage;
let adminpage;
test.describe('Admin Validation', async () => {
    test('Validate Search Bar', async ({page}) => {
        loginpage = new LoginPage(page)
        adminpage = new AdminPage(page)

        loginpage.goTo()
        await helper.loginValidAdmin(page,"//div[@class = 'swal2-success-ring']")
        await adminpage.validateSearchBar()
    })

})