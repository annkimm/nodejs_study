module.exports = {
    customerList: 'SELECT * FROM CUSTOMERS',
    customerInsert: 'INSERT INTO CUSTOMERS SET ?',
    customerUpdate: 'UPDATE CUSTOMERS SET ? WHERE id=?',
    customerDelete: 'DELETE FROM CUSTOMERS WHERE id=?',
    customer: 'SELECT * FROM CUSTOMERS WHERE id=?'
}

// ?에 앞에 넘겨준 값이 들어감
// ?에 넘겨준 값이 들어가면 key, value 다 분리함
// INSERT INTO CUSTOMERS SET usrname="Jonn" 이런식으로 insert되는 것
// ?가 여러개면 배열로 넘겨주면 순차적으로 적용됨