import {test,expect} from '@playwright/test'
import axios from 'axios'
const helper = require('../helper')
const UserCreationData = require('../test-data/UserCreationData.json')
import { LoginPage } from '../PageObject/LoginPage'

let loginpage;

test.describe('Register New Teacher', async () => {
    
    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        await loginpage.goTo()
    })

    // test.afterAll(async ({page})=>{
    //     await page.close()
    // })

    test("Login With Wrong Email", async ({page}) => {
        await loginpage.registerTeacher(UserCreationData.wrong_email.name, UserCreationData.wrong_email.email, UserCreationData.wrong_email.username, UserCreationData.wrong_email.password, "//div[@class='swal2-icon swal2-error swal2-icon-show']", "//button[@class='swal2-confirm swal2-styled']")
    })

    test("Login With Empty Data", async ({page}) => {
        await loginpage.registerTeacher(UserCreationData.emply_field.name, UserCreationData.emply_field.email, UserCreationData.emply_field.username, UserCreationData.emply_field.password, "//div[@class='swal2-icon swal2-warning swal2-icon-show']", "//button[@class='swal2-confirm swal2-styled']")
    })

    test("Login With Valid Data", async ({page}) => {
        await loginpage.registerTeacher(UserCreationData.valid_data.name, UserCreationData.valid_data.email, UserCreationData.valid_data.username, UserCreationData.valid_data.password, "//div[@class='swal2-success-ring']", "//button[@class='swal2-confirm swal2-styled']")
    })

    test("Validate already register or not", async ({page}) => {
        await loginpage.registerTeacher(UserCreationData.valid_data.name, UserCreationData.valid_data.email, UserCreationData.valid_data.username, UserCreationData.valid_data.password, "//div[@class='swal2-success-ring']", "//button[@class='swal2-confirm swal2-styled']")

        // Call API for the delete the testuser record from database
        let res = await axios.get('http://localhost:3000/TeacherNameData')

        await axios.delete("http://localhost:3000/delStaff",{
            data : {id : res.data.data[0].sid}
        })
    })
})