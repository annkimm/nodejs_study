// Noemailer
// 다른 모듈의 의존성이 없는 모듈
// 유니코드 지원 - 영어, 한국어, 중국어 등 다양한 언어로 메일 작성 가능
// 파일 첨부 기능
// 이메일 본문에 일반 텍스트뿐만이 아니라 HTML도 삽입 가능
// OAuth2 지원
// SMTP 연결을 위한 프록시 사용 가능

const express = require("express")
const app = express();

require("dotenv").config({path: "nodemailer/.env"})
const nodemailer = require("./nodemailer");

app.use(express.json({
    limit: "50mb"
}))

app.listen(3000, () => {
    console.log("서버 시작");
    
})

app.post("/api/email", async(req, res)=> {
    console.log(req.body.param);
    const r = await nodemailer.send(req.body.param)

    res.send(r);
})