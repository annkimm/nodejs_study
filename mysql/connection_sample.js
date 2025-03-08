const mysql = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'mjk1580',
    database : 'dev'
  });
   
  connection.connect();
   
  connection.query('SELECT * FROM CUSTOMERS', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
   
  connection.end();
  // 사용하는게 끝나면 반드시 종료시켜줘야 함
  // 데이터 베이스 연동할 때마다 커넥션이 계속 생성되고
  // 종료가 안돼서 계속 늘어나다가 서버가 죽을 수 있으므로
  // 반드시 종료 필수!