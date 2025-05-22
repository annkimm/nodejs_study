// cors - Cross Origin Resorce Sharing 교차 출처 리소스 공윤ㄴ
// origin이 중요
// origin - http://localhost: 3000
// Url 구조에서 프로토콜, 호스트, 포트, 합친 것
// corss origin이라고 하면 프로토콜, 호스트, 포트 중에 하나라도 다르면 그것은 origin이 다른 것
// SOP(Same Origin Policy - 같은 오리지인인 경우에만 리소스 접근 허용) 정책을 원래 브라우저가 가지고 있음.
// 잠재적인 보안 위협이 있을 수 있기 때문에, 다른 Origin을 가져오는 것을 허용하지 않는다.
// 클라이언트와 서버가 서로 다른 Origin을 갖는 경우가 발생
// Next.js localhost: 3000, node.js localhost:7000 처럼 서로 다른 Origin을 가지는 케이스가 많음

const express = require("express");
const app = express();
const cors = require("cors");

// 전체 라우트 적용 가능
// 어떤 클라이언트만 허용해줄 것인가
const corsOptions = {
    origin: "http://localhost:8080",
    optionSuccessStatus: 200,
}

app.listen(3000, () => {
    console.log('서버 시작 (3000 포트)');
})

app.use(cors(corsOptions))
// 해제한다고 주석해도 리스타트 하더라도 새로고침을 안하면 캐싱이 남아 있어서 여전히 cors 처리한게 잘 될 수 있으니 새로고침과 캐시비우기 필수

app.get("/", (req, res) => {
    res.send("OK");
})

app.get("/api/customers", (req, res) => {
    const customerList = [
        {name: "유재석", email: "zizicoo208@naver.com", phone: "010-0001-0000"},
        {name: "김종국", email: "nyangko29@gmail.com", phone: "010-0001-0001"},
        {name: "송지효", email: "nyangko29@gmail.com", phone: "010-0001-0002"}
    ]

    res.send(customerList);
})

const corsOptionsExternal = {
    origin: "http://localhost:8081",
    optionSuccessStatus: 200,
}

//  라우트별로도 cors 적용 가능
app.get("/api/products", cors(corsOptionsExternal),(req,res) => {
    res.send("제품 정보")
})