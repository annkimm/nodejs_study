const express = require("express");
const app = express();
//엑셀 파일을 처리하면 거의 다 xlsx 모듈로 다 처리

const xlsx = require("xlsx")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads")
    }, filename: function(req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

app.post("/api/xlsx", upload.single("xlsx"), async(req, res) => {
    // 가상의 엑셀파일 생성, 처리를 위해서
    const workbook = xlsx.readFile(req.file.path);
    // 시트가 여러개일수도 있음으로 배열
    // 시트명으로 시트를 가져올 수 있어서 시트명을 찾는 것
    
    const firstSheetName = workbook.SheetNames[0];
    const firstSheet = workbook.Sheets[firstSheetName];
    const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet)
    res.send(firstSheetJson)
})

app.listen(3000, () => {
    console.log("서버 성공");
})