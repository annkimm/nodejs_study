const express = require('express');
require("dotenv").config({path: `mysql/.env.test`});

const customersRoute = require("./routes/customers")
const app = express();

app.listen(3000, () => {
   console.log("서버 시작");
    
})

app.use("/api/customer", customersRoute)