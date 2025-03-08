const mysql = require("mysql2");
const sql = require("./sql");

const pool = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  port     : process.env.MYSQL_PORT,
  user     : process.env.MYSQL_USRERNAME,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DB,
  connectionLimit: process.env.MYSQL_LIMIT // 매번 커넥션을 만들고 종료하지 않고, pool을 10개까지 만들어서 천 명, 만명 유저들이 사용하는 것, 동시에 모든 유저가 사용하는 것이 아니기 때문에 10개를 가지고 돌려쓰는 것
})

const query = async(alias, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql[alias], values, (error, results) => {
      if(error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
} 

module.exports = {
  query
}