const express = require("express")
const app = express();
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // 클라이언트에서 받은 파일을 어떤 위치로 저장시킬거냐
        // uploads => 폴더 이름
        cb(null, "uploads");
    },
    filename: function(req, file, cb) {
        // 수천, 수만명의 유저가 파일을 올릴텐데 그럴 경우,
        // 이름이 겹칠 수 있기 때문에 업로드된 파일 이름 규칙을 명명
        // 앞에 초의 이름을 넣으면 시간순서대로 정렬 가능

        cb(null, new Date().valueOf() + path.extname(file.originalname))
        // 시스템 시간으로 파일이름을 변경해서 저장
    }
})

// 여기서 실제 업로드를 처리
const upload = multer({storage: storage})

// 실무에서 보통 single을 많이 이용
// upload.array도 존재. 동시에 파일을 여러개 받아서 저장할 때 사용
app.post("/api/attachment", upload.single("attachment"), async(req, res) => {
    // upload.single을 등록했기 때문에 req.file을 사용 가능
    res.send(req.file) // 여러개 받을 때는 req.files로 사용해야함
    // 실제로 저장을 안하고 배열로 데이터만 쌓다가
    // 저장 버튼을 누르는 순간 파일과 파일 정보를 저장도 할 수 있다.
});

app.listen(3000, () => {
    console.log("서버 성공");
})