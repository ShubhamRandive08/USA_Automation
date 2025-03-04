const { test, expect } = require('@playwright/test');
const UserLoginData = require('./test-data/UserLoginData.json');
const { LoginPage } = require('./PageObject/LoginPage');

export async function validate(page) { 
    const loginPage = new LoginPage(page); 
    await loginPage.validateComponents();
}

export async function  loginValidTeacher(page,validComponent) {
    const loginpage = new LoginPage(page)
    await loginpage.teacherLogin(UserLoginData.perfect_user.username,UserLoginData.perfect_user.password,validComponent)
}

export async function loginWithWrongUsername(page,validateComponent) {
    const loginpage = new LoginPage(page)
    await loginpage.teacherLogin(UserLoginData.worng_with_username.username,UserLoginData.worng_with_username.password,validateComponent)
}

export async function loginWithWrongPassword(page,validateComponent) {
    const loginpage = new LoginPage(page)
    await loginpage.teacherLogin(UserLoginData.wrong_with_pass.username,UserLoginData.wrong_with_pass.password,validateComponent)
}

export async function noUsernamePassword(page,validateComponent) {
    const loginpage = new LoginPage(page)
    await loginpage.teacherLogin(UserLoginData.assert_with_empty_field.username,UserLoginData.assert_with_empty_field.password,validateComponent)
}

