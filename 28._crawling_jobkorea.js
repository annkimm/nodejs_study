const cheerio = require("cheerio");
const axios = require("axios");
require("dotenv").config({path: "nodemailer/.env"})
const nodemailer = require("./nodemailer");
const cron = require("node-cron")

const getHTML = async (keyword) => {
    try {
        const html = axios.get(`https://www.jobkorea.co.kr/Search/?stext=${keyword}&tabType=recruit&Page_No=1`)

        return (await html).data
    } catch (error) {
        console.log(error);
    }
}

const parsing = async (page) => {
    const $ = cheerio.load(page);
    const jobs = [];
    const $jobList = $(`.list .list-item`);

    $jobList.each((idx,node) => {
        const jobTitle = $(node).find(".information-title-link").text().trim()
        const companyName = $(node).find(".corp-name-link").text().trim()
        const experience = $(node).find(".chip-information-item:eq(0)").text().trim()
        const education = $(node).find(".chip-information-item:eq(1)").text().trim()
        const regularYN = $(node).find(".chip-information-item:eq(2)").text().trim()
        const region = $(node).find(".chip-information-item:eq(3)").text().trim()
        const dueDate = $(node).find(".chip-information-item:eq(4)").text().trim()

        jobs.push({jobTitle,companyName, experience, education, regularYN, region, dueDate})
    })

    return jobs   
}

const getJob = async (keyword) => {
    const html = await getHTML(keyword);
    const jobs = await parsing(html);

    return jobs
}

const crawlingJob = async (keyword) => {
    const jobs = await getJob(keyword)

    console.log('sdfs');
    console.log(jobs);
    
    

    const h = [];
    h.push(`<table style="border: 1px solid black; border-collapse: collapse;">`)
    h.push(`<thead>`)
    h.push(`<tr>`)
    h.push(`<th style="border: 1px solid black;">구인제목</th>`)
    h.push(`<th style="border: 1px solid black;">회사명</th>`)
    h.push(`<th style="border: 1px solid black;">경력여부</th>`)
    h.push(`<th style="border: 1px solid black;">학력여부</th>`)
    h.push(`<th style="border: 1px solid black;">정규직여부</th>`)
    h.push(`<th style="border: 1px solid black;">지역</th>`)
    h.push(`<th style="border: 1px solid black;">D-day</th>`)
    h.push(`</tr>`)
    h.push(`<thead>`)
    h.push(`<tbody>`)
    jobs.forEach(job => {
        h.push(`<tr>`)
        h.push(`<td style="border: 1px solid black;">${job.jobTitle}</td>`)
        h.push(`<td style="border: 1px solid black;">${job.companyName}</td>`)
        h.push(`<td style="border: 1px solid black;">${job.experience}</td>`)
        h.push(`<td style="border: 1px solid black;">${job.education}</td>`)
        h.push(`<td style="border: 1px solid black;">${job.regularYN}</td>`)
        h.push(`<td style="border: 1px solid black;">${job.region}</td>`)
        h.push(`<td style="border: 1px solid black;">${job.dueDate}</td>`)
        h.push(`</tr>`)
    })
    h.push(`</tbody>`)
    h.push(`</table>`)

    const emailData = {
        from: "nyangko29@gmail.com",
        to: "zizicoo208@naver.com",
        subject: "node 구인 공고",
        html: h.join("")
    }

    return await nodemailer.send(emailData);
}

// 1시간 마다 메일 도착, 0 7로 허면 아침 7시에 메일 도착
cron.schedule("0 * * * *", async () => {
    crawlingJob("node.js")
})