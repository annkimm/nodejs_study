const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("서버 시작");
    
})

app.use(
    express.json({ // json이라는 텍스트 크기
    limit: "50mb", // 클라이언트에서 json으로 body로 실어보낼 수 있는 최대 크기
}))

// 정규식의 ? : ? 앞의 문자인 'b'가 없을 수도 있고 하나 있을 수도 있다 
// http://localhost:3000/cbcd
// http://localhost:3000/ccd
// 위의 경로를 타게 됨
// 
app.get("/cb?cd", (req,res) => {
    res.send("ab?cd");
})

// http://localhost:3000/abcd
// http://localhost:3000/abbcd
// http://localhost:3000/abbbcd

// 정규식의 +: 바로 앞에 문자가 무조건 1개 이상
app.get("/db+cd", (req, res) => {
    res.send('db+cd');
})

// 정규식 /문자/ : a가 들어가 있기만 하면 됨
app.get(/a/, (req, res) => {
    res.send('/a/');
})