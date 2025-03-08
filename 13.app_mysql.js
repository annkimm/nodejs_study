const express = require("express");
// ${app.get("env")}
// npm run으로 명령어를 돌리면 뒤에 test인지, prod인지를 알아내올 수 있다.
// 그렇게 해서 현재 환경이 dev모드인지 prod 모드인지 알 수 있다 그를 통해 env 파일을 구분해서 가져올 수 있다.
// require("dotenv").config({path: `mysql/.env.${app.get("env")}`})

require("dotenv").config({path: `mysql/.env`})
// .env.test에는 dev에서의 환경 설정을 넣고,
// .env.prod에서는 실제 운영 환경에 설정 정보를 넣어서 정보를 분리시킴
// npm run test -> "cross-env NODE_ENV=test node 13_app_mysql.js"
// npm run prod -> "cross-env NODE_ENV=prod node 13_app_mysql.js"
const sql = require("./mysql")
const app = express();
const port = 3000;

app.use(express.json({
    limit: "50mb"
}))

app.listen(port, () => {
    console.log("3000 포트 시작");
})

app.get("/api/customers", async(req, res) => {
    const customerList = await sql.query("customerList");
    res.send(customerList);
})

app.post("/api/customer", async(req, res) => {
    const result = await sql.query("customerInsert", req.body.param);
    res.send(result);
})

app.put("/api/customer/:id", async(req, res) => {
    const id = req.params.id;
    const result = await sql.query("customerUpdate", [req.body.param,id])

    res.send(result);
})

app.delete("/api/customer/:id", async(req, res) => {
    const id = req.params.id;
    const result = await sql.query("customerDelete", id)

    res.send(result);
})

app.get("/api/customer/:id", async(req, res) => {
    const id = req.params.id;
    const customer = await sql.query("customer", id);
    res.send(customer[0]); // 무조건 배열로 전달되기 때문에 index를 붙여줘야 함
})