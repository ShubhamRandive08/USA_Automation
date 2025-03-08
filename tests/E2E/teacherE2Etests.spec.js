const { test, expect } = require('@playwright/test')
const helper = require('../../helper')
const { LoginPage } = require('../../PageObject/LoginPage')
const { TeacherPage } = require('../../PageObject/TeacherPage')
const { LogoutPage } = require('../../PageObject/LogoutPage')
const UserLoginData = require('../../test-data/UserLoginData.json')
let loginpage;

test.describe('Teacher Page E2E', () => {
    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        await loginpage.goTo()
        await helper.validate(page)
    })
    test('E2E test case of teacher', {
        tag: ['@e2e']
    }, async ({ page }) => {
        const users = [
            'USER_1',
            'USER_2'
        ]

        const studnetData = [
            'teststudent1',
            'teststudent2'
        ]
        let teacharpage = new TeacherPage(page)
        let logout = new LogoutPage(page)

        for (let i = 0 ; i < users.length; i++) {
            await helper.loginValidTeacher(
                page,
                users[i], 
                `//span[@class = 'nav-profile-name']`
            ) // ValidUser
            // methods for dashboard page
            await teacharpage.validateItem()
            await teacharpage.validateDashboard(
                UserLoginData[users[i]].perfect_user.username.split('@')[0]
            )
            await teacharpage.validateNewAddForDashboard()
            // methods for new admission page 
            await teacharpage.validateNewAdmissionPage(
                UserLoginData[users[i]].perfect_user.username.split('@')[0],
                '//div[@class="swal2-container swal2-top swal2-backdrop-show"]',
                studnetData[i]
            )
            await teacharpage.validateNewAdmissionPage(
                UserLoginData[users[i]].perfect_user.username.split('@')[0],
                '',
                studnetData[i]
            )
            await teacharpage.validatStaffPage() // Methods for staff page
            await teacharpage.validateStudentList() // Methods for student list page
            await teacharpage.validateEventPage()  // Method for event page
            await logout.onlyLogout()
        }
    })
})
