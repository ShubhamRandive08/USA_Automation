const {test,expect}  = require('@playwright/test')
const helper = require('../helper')
const {LoginPage} = require('../PageObject/LoginPage')

test.describe('Validate Logout Function', async () =>{

    test.beforeEach(async ({page}) => {
        const loginpage = new LoginPage(page)
        await loginpage.goTo()
        await helper.validate(page)
    })
    test('Validate Dashboard Logout Function', async ({page}) => {
        await helper.loginValidTeacher(page,"//span[@class = 'nav-profile-name']")
    })
})