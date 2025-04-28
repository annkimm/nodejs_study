const cron = require("node-cron");

require("dotenv").config({path: "nodemailer/.env"})
const nodemailer = require("./nodemailer");

require("dotenv").config({path: "mysql/.env.test"});
const mysql = require("./mysql");
const express = require("express");
const app = express();

// 정상적인 케이스 - 매일 특정 시간, 매주 월요일 아침 7시 등, 
// 그 특정 주기마다 발생한 신규 데이터만 조회해서 이메일로 전송
const task = cron.schedule("* * * * *", async () => {
    const customerList = await mysql.query("customerList");
    
    const h = [];
    h.push(`<table style="border: 1px solid black; border-collapse: collapse;">`)
    h.push(`<thead>`)
    h.push(`<tr>`)
    h.push(`<th style="border: 1px solid black;">고객 Id</th>`)
    h.push(`<th style="border: 1px solid black;">고객 이름</th>`)
    h.push(`<th style="border: 1px solid black;">고객 email</th>`)
    h.push(`<th style="border: 1px solid black;">고객 phone</th>`)
    h.push(`</tr>`)
    h.push(`<thead>`)
    h.push(`<tbody>`)
    customerList.forEach(customer => {
        h.push(`<tr>`)
        h.push(`<td style="border: 1px solid black;">${customer.id}</td>`)
        h.push(`<td style="border: 1px solid black;">${customer.name}</td>`)
        h.push(`<td style="border: 1px solid black;">${customer.email}</td>`)
        h.push(`<td style="border: 1px solid black;">${customer.phone}</td>`)
        h.push(`</tr>`)
    })
    h.push(`</tbody>`)
    h.push(`</table>`)

    const emailData = {
        from: "nyangko29@gmail.com",
        to: "zizicoo208@naver.com",
        subject: "신규 고객 목록",
        html: h.join("")
    }

    const r = await nodemailer.send(emailData);
    return r;

}, {scheduled: false})

app.listen(3000, () => {
    console.log('3000 포트 서버 시작');
})

app.get("/api/task/start", (req, res) => {
    task.start();
    res.send("task가 시작되었습니다.")
})

app.get('/api/task/stop',(req, res) => {
    task.stop();
    res.send("task가 종료되었습니다.")
} )
