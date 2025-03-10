const {test,expect} = require('@playwright/test')
const { AdminPage } = require('../../PageObject/AdminPage')
const { LoginPage } = require('../../PageObject/LoginPage')
const { LogoutPage } = require('../../PageObject/LogoutPage')
const { TeacherPage } = require('../../PageObject/TeacherPage')
const  AdminLoginData  = require('../../test-data/AdminLoginData.json')

test.describe('Admin E2E tests', async () =>{

    test('Admin testing',{
        tag : ['@functional']
    }, async ({browserName,page}) =>{
    if (browserName !== 'firefox') test.skip();


        let adminpage = new AdminPage(page)
        let loginpage = new LoginPage(page)
        let logoutpage = new LogoutPage(page)
        let teacherpage = new TeacherPage(page)

        await loginpage.goTo()
        await loginpage.adminLogin(
            AdminLoginData.perfect_admin.username,
            AdminLoginData.perfect_admin.password ,
            "//div[@class = 'swal2-success-ring']"
        )

        await adminpage.validateTeacherStatus()
    })
})