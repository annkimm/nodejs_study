const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

// 로그관리
// 개발자에 의해서 의도적으로 기록하는 메세지
// 시스템을 운영하면서 발생하는 예기치 못한 에러
//error.log

// rfs에서 지정한 파일을 생상 시간 간격에 따른 로그 파일명을 반환.
const generator = (time, idx) => {
    if(!time) {
        // 최초 실행시 시간이 들어가지 않음
        return "file.log";
    }

    const yearMonth = time.getFullYear() + (time.getMonth() + 1).toString().padStart(2, "0");
    const day = time.getDate().toString().padStart(2, "0")
    const hour = time.getHours().toString().padStart(2, "0")
    const minute = time.getMinutes().toString().padStart(2, "0")

    return `${yearMonth}${path.sep}${yearMonth}${day}-${hour}${minute}-${idx}-file.log`
}

// 매개변수 파일 생성기준, 어떤 간격으로 로그 파일 생성 기준/파일 크기
const accessLogStream = rfs.createStream(generator, {
    interval: '1m',
    size: "10M",
    path: path.join(__dirname, "log")
, })
// 사이즈가 10m가 넘으면 또다른 파일이 생성됨 _1, _2 이런식으로
// path: 폴더 경로, __dirname: morgan이 살행되고 있는 경로에서 log 폴더를 만듦

app.use(morgan("combined", {stream: accessLogStream, skip: function(req, res) {
    return res.statusCode < 400; // 정상적인 응답이 이루어진 경우에는 로그를 기록하지 말 것. 에러인 경우만 로그 기록
}}))

app.get("/", async(req, res) => { 
    res.send("hello world")
})


app.listen(3000, () => {
    console.log("서버 성공");
})