import { test, expect } from '@playwright/test'
import exp from 'constants'
import axios from 'axios'
const enums = require('../enums')
exports.TeacherPage = class TeacherPage {
    /**
     * @param {import ('@playwright/test').Page} page
     */

    constructor(page) {
        //init page
        this.page = page

        this.outerStudnetList = page.getByRole('link', { name: `󰄫 STUDENT LIST 󰅀` })
        this.innerStudentList = page.getByRole('link', { name: `Student List`, exact: true })
        this.confirmBtn = page.locator('//button[@class="swal2-confirm swal2-styled swal2-default-outline"]')
        this.rightMark = page.locator('//div[@class="swal2-success-ring"]')
        this.titleMark = page.locator('//h2[@class="swal2-title"]')
        this.cancleBtn = page.locator('//button[@class="swal2-cancel swal2-styled swal2-default-outline"]')
        this.submitBtn = page.locator('//input[@value="SUBMIT"]')

        // Element for dashboard page
        this.sideBar = page.locator("//nav[@class='sidebar sidebar-offcanvas']")
        this.searchBar = page.getByPlaceholder("Search First Name")
        this.admissionTab = page.locator('//div[@id="admissionTab"]')
        this.feeBar = page.locator('//div[@id="feeBar"]')
        this.tname = page.locator('//span[@id="tname"]')
        this.sideBarDashboard = page.getByRole('link', { name: '󰋜 Dashboard' })
        this.sideBarNewAdmission = page.getByRole('link', { name: '󰝦 NEW ADDMISSION 󰅀' })
        this.sideBarStaff = page.getByRole('link', { name: '󰕱 STAFF 󰅀' })
        this.sideBarStudentList = page.getByRole('link', { name: '󰄫 STUDENT LIST 󰅀' })
        this.sideBarEvent = page.getByRole('link', { name: '󰃳 Events' })
        this.downloadIcon = page.locator('//button[@class="btn btn-light bg-white btn-icon me-3 d-none d-md-block "]')
        this.newAddBtn = page.locator('//button[@class="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0"]')
        this.downloadBtn = page.locator('//button[@class="btn btn-primary mt-2 mt-xl-0"]')

        // Elements for staff page
        this.mainContent = page.locator('//div[@id="admin-staff"]')
        this.adminText = page.locator('//h1[@class="card-title"]')


    }

    async validateItem() {
        // await this.page.sideBar.waitFor(); 
        await this.page.waitForTimeout(3000)
        await expect(
            this.sideBar
        ).toBeVisible();
        await expect(
            this.searchBar
        ).toBeVisible();
        await expect(
            this.admissionTab
        ).toBeVisible();
        await expect(
            this.feeBar
        ).toBeVisible();
        await expect(
            this.tname
        ).toBeVisible();
        await expect(
            this.sideBarDashboard
        ).toBeVisible();
        await expect(
            this.sideBarStaff
        ).toBeVisible();
        await expect(
            this.sideBarStudentList
        ).toBeVisible();
        await expect(
            this.sideBarEvent
        ).toBeVisible();
        await expect(
            this.downloadIcon
        ).toBeVisible();
        await expect(
            this.newAddBtn
        ).toBeVisible();
        await expect(
            this.downloadBtn
        ).toBeVisible();
    }

    // Methods for dashboard page
    async validateDashboard(tname) {
        let res = await axios.get(
            `${process.env.API_DOMAIN}/${enums.TEACHER_NAME}/${tname}`
        )
        let res2 = await axios.get(
            `${process.env.API_DOMAIN}/studData`
        )
        let count = 0;
        for (let i = 0; i < res2.data.studData.length; i++) {
            if (res2.data.studData[i].tid == res.data.data[0].sid)
                count++
        }
        await this.page.waitForTimeout(3500)
        await expect(
            this.tname
        ).toHaveText(tname)
        await expect(this.page.locator("#recent-purchases-listing > tbody > tr")).toHaveCount(count + 1)
        await this.downloadIcon.click()
        await expect(
            this.page.locator("//div[@class='swal2-icon swal2-warning swal2-icon-show']")
        ).toBeVisible()
        await expect(
            this.cancleBtn
        ).toBeVisible()
        await this.cancleBtn.click()
        await this.downloadIcon.click()
        await expect(
            this.confirmBtn
        ).toBeVisible();
        await this.confirmBtn.click();
        await expect(
            this.rightMark
        ).toBeVisible()
        await expect(
            this.titleMark
        ).toHaveText('Downloaded!')
        await expect(
            this.confirmBtn
        ).toBeVisible()
        await this.confirmBtn.click()
        await this.newAddBtn.click()
    }

    async validateNewAddForDashboard() {
        await expect(
            this.page.locator('//p[@class="card-description"]')
        ).toBeVisible();
        await this.sideBarDashboard.click();
        await this.downloadBtn.click();
        await expect(
            this.confirmBtn
        ).toBeVisible();
        await this.confirmBtn.click();
        await expect(
            this.rightMark
        ).toBeVisible()
        await expect(
            this.titleMark
        ).toHaveText('Downloaded!')
        await expect(
            this.confirmBtn
        ).toBeVisible()
        await this.confirmBtn.click()
    }

    // Methods for the new admission page
    async validateNewAdmissionPage(tname, validComponent) {
        if (validComponent == '') {
            await this.page.locator('//input[@id="fname"]').click();
            await this.page.locator('//input[@id="fname"]').type('teststudent');
            await this.page.locator('//input[@id="mname"]').click();
            await this.page.locator('//input[@id="mname"]').type('tester');
            await this.page.locator('//input[@id="lname"]').click();
            await this.page.locator('//input[@id="lname"]').type('tests');
            await this.page.locator('//select[@id="gender"]').selectOption('Male');
            await this.page.locator('//input[@id="dob"]').click();
            await this.page.locator('//input[@id="dob"]').type('01-01-2003');
            await this.page.locator('//input[@id="twelveth"]').click();
            await this.page.locator('//input[@id="twelveth"]').type('88');
            await this.page.locator('//input[@id="tenth"]').click();
            await this.page.locator('//input[@id="tenth"]').type('88');
            await this.page.locator('//input[@id="add"]').click();
            await this.page.locator('//input[@id="add"]').type('test');
            await this.page.locator('//input[@id="state"]').click();
            await this.page.locator('//input[@id="state"]').type('test');
            await this.page.locator('//input[@id="mb"]').click();
            await this.page.locator('//input[@id="mb"]').type('8530871617');
            await this.page.locator('//input[@id="pcode"]').click();
            await this.page.locator('//input[@id="pcode"]').type('416208');
            await this.page.locator('//input[@id="city"]').click();
            await this.page.locator('//input[@id="city"]').type('test');
            await this.page.locator('//input[@id="fee"]').click();
            await this.page.locator('//input[@id="fee"]').type('10000');
            await this.page.locator('//input[@id="aadharno"]').click();
            await this.page.locator('//input[@id="aadharno"]').type('35242282309');
            await expect(
                this.submitBtn
            ).toBeVisible()
            await this.submitBtn.click()
            await expect(
                this.submitBtn
            ).toBeVisible()
        } else {
            await expect(
                this.tname
            ).toHaveText(tname)
            await this.sideBarNewAdmission.click();
            await expect(
                this.page.getByRole('link', { name: `New Student` })
            ).toBeVisible()
            await this.page.getByRole('link', { name: 'New Student' }
            ).click()
            await expect(
                this.submitBtn
            ).toBeVisible()
            await this.submitBtn.click()
            // await expect(this.page.locator(`${validComponent}`)).toBeVisible()

        }
    }

    // Validate Staff Page
    async validatStaffPage() {
        await this.sideBarStaff.click();
        await expect(
            this.page.getByRole('link', { name: `Staff Member` })
        ).toBeVisible()
        await this.page.getByRole('link', { name: 'Staff Member' }).click()
        await expect(
            this.mainContent
        ).toBeVisible()
        await expect(
            this.adminText
        ).toHaveText('ADMIN STAFF')
    }

    // Validate Student list page
    async validateStudentList() {
        await this.sideBarStudentList.click()
        await expect(
            this.page.getByRole('link', { name: `󰄫 STUDENT LIST 󰅀` })
        ).toBeVisible()
        await this.page.getByRole('link', { name: `Student List`, exact: true }).click()
        await this.downloadIcon.click()
        await expect(
            this.confirmBtn
        ).toBeVisible();
        await this.confirmBtn.click();
        await expect(
            this.rightMark
        ).toBeVisible()
        await expect(
            this.titleMark
        ).toHaveText('Downloaded!')
        await expect(
            this.confirmBtn
        ).toBeVisible()
        await this.confirmBtn.click()
        await this.downloadBtn.click();
        await expect(
            this.confirmBtn
        ).toBeVisible();
        await this.confirmBtn.click();
        await expect(
            this.rightMark
        ).toBeVisible()
        await expect(
            this.titleMark
        ).toHaveText('Downloaded!')
        await expect(
            this.confirmBtn
        ).toBeVisible()
        await this.confirmBtn.click()
    }

    // Validate Events Page
}