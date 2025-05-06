const express = require("express");
const app = express();

require("dotenv").config({path: "nodemailer/.env"})
const nodemailer = require("./nodemailer");

require("dotenv").config({"path": "mysql/.env.test"})
const mysql = require("./mysql");

const xlsx = require("xlsx");

app.use(express.json({
    limit: "50mb"
}))

app.listen(3000, () => {
    console.log("서버 시작");
})

const sendAttachementEmail = async (email, workbook) => {
    // email 형식 from, to, subject, text

    // const emailData = {
    //     from: "nyangko29@gmail.com",
    //     to: "zizicoo208@naver.com",
    //     subject: "엑셀 파일 첨부 테스트",
    //     text: "엑셀 첨부",
    //     attachements: [
    //         {filename: "categroyList.xelx", 
    //         cotent: Buffer.from(xlsx.write(workbook, {type: "base64"}), "base64")
    //         }
    //     ]
    // }

    email.attachments = [
        {filename: "categroyList.xlsx", 
        content: Buffer.from(xlsx.write(workbook, {type: "base64"}), "base64")
        },
        {
            filename: "이미지.png",
            path: "./uploads/1742812250956.png"
        }
    ]

    const r = await nodemailer.send(email)

    return r;
}

app.post("/api/email/attachment", async(req, res) => {
    const customerList = await mysql.query("customerList");
    const workbook = xlsx.utils.book_new();

    const firstSheet = xlsx.utils.json_to_sheet(customerList, {
        skipHeader: false
    });

    firstSheet["!cols"] = [{wpx: 160},{wpx: 160},{wpx: 160},,{wpx: 160} ]

    xlsx.utils.book_append_sheet(workbook, firstSheet, "customerList");

    const r = await sendAttachementEmail(req.body.params, workbook);

    res.send(r);
})