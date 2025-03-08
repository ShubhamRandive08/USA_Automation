const { test, expect } = require('@playwright/test');
const UserLoginData = require('./test-data/UserLoginData.json');
const AdminLoginData = require('./test-data/AdminLoginData.json')
const { LoginPage } = require('./PageObject/LoginPage');
const {TeacherPage} = require('./PageObject/TeacherPage')

let loginpage;

export async function validate(page) {
    loginpage = new LoginPage(page);
    await loginpage.validateComponents();
}

// Methods for teacher login senario
export async function loginValidTeacher(
    page,
    user,
    validComponent
) {
    loginpage = new LoginPage(page)
    await loginpage.teacherValidLogin(
        UserLoginData[user].perfect_user.username,
        UserLoginData[user].perfect_user.password,
        validComponent
    )
}

export async function loginWithWrongUsername(
    page,
    user,
    validateComponent
) {
    loginpage = new LoginPage(page)
    await loginpage.teacherLogin(
        UserLoginData[user].worng_with_username.username,
        UserLoginData[user].worng_with_username.password,
        validateComponent
    )
}

export async function loginWithWrongPassword(
    page,
    user,
    validateComponent
) {
    loginpage = new LoginPage(page)
    await loginpage.teacherLogin(
        UserLoginData[user].wrong_with_pass.username,
        UserLoginData[user].wrong_with_pass.password,
        validateComponent
    )
}

export async function noUsernamePassword(
    page,
    user,
    validateComponent

) {
    loginpage = new LoginPage(page)
    await loginpage.teacherLogin(
        UserLoginData[user].assert_with_empty_field.username,
        UserLoginData[user].assert_with_empty_field.password,
        validateComponent

    )
}

export async function lockedUser(
    page, validateComponent

) {
    loginpage = new LoginPage(page)
    await loginpage.adminLogin(
        AdminLoginData.locked_user.username,
        AdminLoginData.locked_user.password, validateComponent

    )
}

// Methods for admin login senario

export async function loginValidAdmin(
    page,
    validComponent
) {
    loginpage = new LoginPage(page)
    await loginpage.adminLogin(
        AdminLoginData.perfect_admin.username,
        AdminLoginData.perfect_admin.password,
        validComponent
    )
}

export async function loginWithWrongUsernameAdmin(
    page,
    validateComponent
) {
    loginpage = new LoginPage(page)
    await loginpage.adminLogin(
        AdminLoginData.worng_with_username.username, 
        AdminLoginData.worng_with_username.password,
        validateComponent
    )
}

export async function loginWithWrongPasswordAdmin(
    page,
    validateComponent
) {
    loginpage = new LoginPage(page)
    await loginpage.adminLogin(
        AdminLoginData.wrong_with_pass.username,
        AdminLoginData.wrong_with_pass.password,
        validateComponent
    )
}

export async function noUsernamePasswordAdmin(
    page,
    validateComponent
) {
    loginpage = new LoginPage(page)
    await loginpage.adminLogin(
        AdminLoginData.assert_with_empty_field.username,
        AdminLoginData.assert_with_empty_field.password,
        validateComponent
    )
}