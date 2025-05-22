// sequelize는 MYSQL, Maria DB, MS SQL 등과 같은 RDMS 데이터베이스를 위한 promise 기반 Node.js ORM 도구
// ORM - Object Relational Mapping
// 자바스크립트 객체와 데이터베이스 별도의 쿼리문 작성 없이도 데이터 베이스의 데이터를 손쉽게 조작할 수 있도록 맵핑
// sequelize는-cli

const express = require("express");
const app = express();
const sequelize = require("./models").sequelize;

sequelize.sync(); // 만약 테이블이 없을 경우, 자동으로 생성해줌

const  {customers} = require("./models") // 테이블에 대한 sequelize 모델을 가져온 것

app.listen(3000, () => {
    console.log("서버 시작");
})

app.use(express.json({
    limit: "50mb"
}))

app.get("/api/customers", async (req, res) => {
    const customerList = await customers.findAll();
    res.send(customerList); 
})

app.post("/api/customer", async (req, res) => {
    const result = await customers.create(req.body.param)

    res.send(result);
})

app.put("/api/customer/:id", async (req, res) => {
    const result = await customers.update(req.body.param, {where: {id: req.params.id}})

    res.send(result);
})

app.delete("/api/customer/:id", async (req, res) => {
    const result = await customers.destroy({
        where: {id: req.params.id}
    })

    res.status(200).send(`${result}`);
})