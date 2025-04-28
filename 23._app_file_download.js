const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mime = require("mime").default;

app.listen(3000, () => {
    console.log("서버 시작");    
})

app.get("/file/:filename", (req, res) => {
    const file = "./uploads/" + req.params.filename;

    try {
        if (fs.existsSync(file)) {
            // 1. 첫번째 방법
            // const mimetype = mime.getType(file);
            // const filename = path.basename(file)
            // res.setHeader("Content-disposition", "attachment; filename=" + filename) // 다운로드되는 파일 이름
            // res.setHeader("Content-Type", mimetype) // 파일 형식 지정
            // const filestream = fs.createReadStream(file)
            // filestream.pipe(res)
            // 어디로 전달해줄 건지를 지정
            
            // 2. 두번재 받법
             res.download(file)
        } else {
            res.send("요청한 파일이 존재하지 않습니다.")
        }
    } catch(e) {
        console.log(e);
        
        res.send("파일을 다운로드하는 중 에러가 발생하였습니다.")
    }
})