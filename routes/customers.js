const express = require("express");
const router = express.Router();
const sql = require('../mysql');

// '/api/customer/all'로 연결
router.get("/all", async(req, res) => {
    const customerList = await sql.query("customerList");
    res.send(customerList);
})

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const customer = await sql.query("customer", id);
    res.send(customer[0]); // 무조건 배열로 전달되기 때문에 index를 붙여줘야 함
})

// 마지막에 반드시 export 필요
module.exports = router;
