const { test, expect } = require('@playwright/test');
const UserLoginData = require('./test-data/UserLoginData.json');
const { LoginPage } = require('./PageObject/LoginPage');

async function validate(page) { 
    const loginPage = new LoginPage(page); 
    await loginPage.validateComponents();
}

async function  loginValidTeacher(page,validComponent) {
    const loginpage = new LoginPage(page)
    await loginpage.teacherLogin(UserLoginData.perfect_user.username,UserLoginData.perfect_user.password,validComponent)
}

async function loginWithWrongUsername(page,validateComponent) {
    const loginpage = new LoginPage(page)
    await loginpage.teacherLogin(UserLoginData.worng_with_username.username,UserLoginData.worng_with_username.password,validateComponent)
}

async function loginWithWrongPassword(page,validateComponent) {
    const loginpage = new LoginPage(page)
    await loginpage.teacherLogin(UserLoginData.wrong_with_pass.username,UserLoginData.wrong_with_pass.password,validateComponent)
}

async function noUsernamePassword(page,validateComponent) {
    const loginpage = new LoginPage(page)
    await loginpage.teacherLogin(UserLoginData.assert_with_empty_field.username,UserLoginData.assert_with_empty_field.password,validateComponent)
}



module.exports = { validate, loginValidTeacher, loginWithWrongUsername, loginWithWrongPassword, noUsernamePassword };
