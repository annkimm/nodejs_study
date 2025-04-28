//.ics - 아이 캘린더(iCalendar)
// 인터넷 사용자들이 다른 사용자들에게 전자메일을 이용해서 요청 혹은 알람, 일정을 보내거나 .ics 파일을 공유할 수 있게 해주는 파일 형식

const express = require("express");
const app = express();
require("dotenv").config({path: "nodemailer/.env"});
const nodemailer = require("./nodemailer");

app.use(express.json({
    limit: "50mb"
}))

app.listen(3000, () => {
    console.log("서버가 포트 3000으로 시작");
})

app.post("/api/ics", async(req, res) => {
    const event = {
        start: [2025, 3,10, 9, 30],// 년, 월, 일, 시간, 분
        duration: {hours: 1, minutes: 30},
        title: "Node.js 스터디 모임",
        description: "개발자의 품격",
        location: "제주특별시 제주시 더그레잇 3층",
        geo: {lat: 30.12, lon: 50.45},
        organizer: {name: "mj Kim", email: "nyangko29@gmail.com"},
        attendees: [
            {name: "MJ", email: "zizicoo208@naver.com", rsvp: true, // 회신 여부
            role: "REQ-PARTICIPANT" // 필수 참석자
            },
            {name: "MJ", email: "zizicoo222228@naver.com", rsvp: false, // 회신 여부
                role: "OPT-PARTICIPANT" // 선택 참석자
                } 
        ]
    }

    const r = await nodemailer.sendWithICS(req.body.param, event)

    res.send(r);
})