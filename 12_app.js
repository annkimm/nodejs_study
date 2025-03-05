// express 설치해서 사용하는 오픈 소스 서버
// 참조하는 모듈까지 같이 사용됨 => npm install express

const express = require("express");
const app = express();
const port = 3000;

app.use(
    express.json({ // json이라는 텍스트 크기
    limit: "50mb", // 클라이언트에서 json으로 body로 실어보낼 수 있는 최대 크기
}))

app.listen(port, () =>  {
    console.log("서버가 포트 3000으로 시작")
});

//라우터
// 클라이언트와 서버간의 잦은 네크워크 통신이 일어나는데, 클라이언트에서 서버의 어떤 주소로 호출할 건지를 정의
// 각각 주소에 특정 기능을 하는 코드를 작성하는데, 라우터 하나하나마다 특정 기능을 함
// get, post, put, delete

// 라우터( 주소 + http method )
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// http://localhost:3000/customer get
app.get("/customers", (req, res) => {
    // db에 있는 고객 정보를 조회해서 클라이언트에게 응답

    const customers = [
        {name: "John Doe", email: "john1@gmail.com"},
        {name: "John Doe", email: "jane@gmail.com"}
    ]

    res.send(customers);
})

// http://localhost:3000/customer/1 => 등적인 /:id인 parmas로 받음
// http://localhost:3000/customer?id=1 => query로 받음
app.get("/customer/:id", (req, res) => {
    // const id = req.query.id
    const id = req.params.id;
    // db에 있는 고객 정보를 조회해서 클라이언트에게 응답

    const customers = [
        {id: 1, name: "John Doe", email: "john1@gmail.com"},
        {id: 2, name: "John Doe", email: "jane@gmail.com"}
    ]

    const customer = customers.filter((c) => String(c.id) === id);


    if (customer.length > 0) {
        res.status(200).send(customer[0]);
    } else {
        res.status(401).send({msg: "존재하지 않는 아이디입니다."})
    }

    res.send(customer);
})

// 라우터 제일 먼저 걸린 애를 실행함
app.post("/customer", (req,res) => {
    console.log(req.body.params);

    // 데이터베이스에 저장하는 코드를 짜는 것
    
    res.send("OK");
})