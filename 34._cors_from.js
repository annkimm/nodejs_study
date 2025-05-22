const express = require("express");
const app = express();

app.listen(8080, () => {
    console.log("서버 시작 (8080 포트)");
})

app.all("*", (req, res) => {
    res.sendFile(__dirname + "/34._cors_from.html")
})