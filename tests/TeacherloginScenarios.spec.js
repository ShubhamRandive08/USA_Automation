const {test,expect} = require('@playwright/test')
const helper = require('../helper')
const {LoginPage} = require('../PageObject/LoginPage')

test.describe('Login Page Scenarios', () => {
    // test.afterEach(async ({page}) => {
    //     await page.close()
    // })

    test.beforeEach(async ({page}) => {
        const loginpage = new LoginPage(page)
        await loginpage.goTo()
        await helper.validate(page)
    })
    test('Login with successfull credintials', async ({page}) => {
        await helper.loginValidTeacher(page,"//span[@class = 'nav-profile-name']") // ValidUser
    })

    test('Login with wrong Username', async ({page}) =>{
        await helper.loginWithWrongUsername(page,"//span[@class = 'swal2-x-mark']")
    })

    test('Login with wrong Password', async ({page}) =>{
        await helper.loginWithWrongPassword(page,"//span[@class = 'swal2-x-mark']")
    })

    test('Login with empty data', async ({page}) =>{
        await helper.noUsernamePassword(page,"//div[@class = 'swal2-icon swal2-warning swal2-icon-show']")
    })

    test('Login with locked user', async ({page}) => {
        await helper.lockedUser(page,"//span[@class='swal2-x-mark']")
    })

    test('Admin Login with valid credintials', async ({page}) =>{
        await helper.loginValidAdmin(page,"//div[@class = 'swal2-success-ring']")
    })

    test('Admin Login with wrong username', async ({page}) =>{
        await helper.loginWithWrongUsernameAdmin(page,"//span[@class = 'swal2-x-mark']")
    })

    test('Admin Login with wrong password', async ({page}) =>{
        await helper.loginWithWrongPasswordAdmin(page,"//span[@class = 'swal2-x-mark']")
    })

    test('Admin Login with null data', async ({page}) =>{
        await helper.noUsernamePasswordAdmin(page,"//div[@class = 'swal2-icon swal2-warning swal2-icon-show']")
    })

    

})
