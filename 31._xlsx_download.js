const express = require("express");
const app = express();

require("dotenv").config({path: "mysql/.env.test"})
const mysql = require("./mysql");
const xlsx = require("xlsx");

app.listen(3000, () => {
    console.log("서버 시작");
})

 app.get("/api/xlsx/download", async(req,res) => {

    const categoryList = await mysql.query("customerList");
    console.log(categoryList);
    
    const workbook = xlsx.utils.book_new();
    const firstSheet = xlsx.utils.json_to_sheet(categoryList, {
        skipHeader: false
    });

    firstSheet['!cols'] = [{wpx: 160}, {wpx: 160}, {wpx: 200}, {wpx: 80}]

    xlsx.utils.book_append_sheet(workbook, firstSheet, "CategoryList")
    // 물리적으로 필요없는 단발성 파일의 개념으로 만들어야 함
    // 왜냐면 DB가 바뀔 수도 있기 때문에
    // 만일 생성하면 나중에 바로 삭제해야하기 때문에 그런 경우 쓸데없는 캐시를 잡아먹음

    res.setHeader("Content-disposition", "attachment;filename=categoryList.xlsx")
    res.setHeader("Cotent-TYpe", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

    const downloadFile = Buffer.from(xlsx.write(workbook, {type: "base64"}), "base64")

    res.end(downloadFile);
    // 물리적인 엑셀 파일을 생성하지 않고, 메모리에 담겨져있는 엑셀 내용을 갖고 버퍼로 그 내용을 담아서 보내주는 것
 })