const {test,expect} = require('@playwright/test')
const helper = require('../../helper')
const {LoginPage} = require('../../PageObject/LoginPage')
const {TeacherPage} = require('../../PageObject/TeacherPage')
const UserLoginData = require('../../test-data/UserLoginData.json')
let loginpage;

test.describe('Teacher Page E2E', () => {
    test.beforeEach(async ({page}) => {
        loginpage = new LoginPage(page)
        await loginpage.goTo()
        await helper.validate(page)
    })
    test('E2E test case of teacher page USER_1',{
        tag : ['@e2e', '@user1']
    }, async ({page}) => {
        await helper.loginValidTeacher(page,'USER_1',"//span[@class = 'nav-profile-name']") // ValidUser

        let teacharpage = new TeacherPage(page)

        // methods for dashboard page
        await teacharpage.validateItem()
        await teacharpage.validateDashboard(UserLoginData.USER_1.perfect_user.username.split('@')[0])
        await teacharpage.validateNewAddForDashboard()

        // methods for new admission page 
        await teacharpage.validateNewAdmissionPage(UserLoginData.USER_1.perfect_user.username.split('@')[0],'//div[@class="swal2-container swal2-top swal2-backdrop-show"]')
        await teacharpage.validateNewAdmissionPage(UserLoginData.USER_1.perfect_user.username.split('@')[0],'')
    })

    test('E2E test case of teacher page USER_2',{
        tag : ['@e2e', '@user2']
    }, async ({page}) => {
        await helper.loginValidTeacher(page,'USER_2',"//span[@class = 'nav-profile-name']") // ValidUser

        let teacharpage = new TeacherPage(page)

        // methods for dashboard page
        await teacharpage.validateItem()
        await teacharpage.validateDashboard(UserLoginData.USER_2.perfect_user.username.split('@')[0])
        await teacharpage.validateNewAddForDashboard()

        // methods for new admission page 
        await teacharpage.validateNewAdmissionPage(UserLoginData.USER_2.perfect_user.username.split('@')[0],'//div[@class="swal2-container swal2-top swal2-backdrop-show"]')
        await teacharpage.validateNewAdmissionPage(UserLoginData.USER_2.perfect_user.username.split('@')[0],'')
        
    })
})
