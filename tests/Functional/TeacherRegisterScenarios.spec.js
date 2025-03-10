import { test, expect } from '@playwright/test'
import axios from 'axios'
const helper = require('../../helper')
const UserCreationData = require('../../test-data/UserCreationData.json')
import { LoginPage } from '../../PageObject/LoginPage'

let loginpage;

test.describe('Register New Teacher', {
    tag : ['@functional']
}, async () => {

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        await loginpage.goTo()
    })

    test("Validate Teacher Registration Scenarios", async ({ browserName,page }) => {
    if (browserName !== 'firefox') test.skip();

        const testCases = [
            {
                name: "Login With Wrong Email",
                data: UserCreationData.wrong_email,
                expectedPopup: "//div[@class='swal2-icon swal2-error swal2-icon-show']",
                confirmButton: "//button[@class='swal2-confirm swal2-styled']"
            },
            {
                name: "Login With Empty Data",
                data: UserCreationData.emply_field,
                expectedPopup: "//div[@class='swal2-icon swal2-warning swal2-icon-show']",
                confirmButton: "//button[@class='swal2-confirm swal2-styled']"
            },
            {
                name: "Login With Valid Data",
                data: UserCreationData.valid_data,
                expectedPopup: "//div[@class='swal2-success-ring']",
                confirmButton: "//button[@class='swal2-confirm swal2-styled']"
            }
        ];

        for (const testCase of testCases) {
            console.log(`Running: ${testCase.name}`);
            await loginpage.registerTeacher(
                testCase.data.name,
                testCase.data.email,
                testCase.data.username,
                testCase.data.password,
                testCase.expectedPopup,
                testCase.confirmButton
            );
        }

        console.log("Validating already registered user...");
        await loginpage.checkAdminExist(
            UserCreationData.valid_data.name,
            UserCreationData.valid_data.email,
            UserCreationData.valid_data.username,
            UserCreationData.valid_data.password,
            "//div[@class='swal2-success-ring']",
            "//button[@class='swal2-confirm swal2-styled']"
        );

        console.log("Deleting test user from database...");
        let res = await axios.get(`${process.env.API_DOMAIN}/TeacherNameData`);

        await axios.delete(`${process.env.API_DOMAIN}/delStaff`, {
            data: { id: res.data.data[0].sid }
        });

        await page.close();
    });
})