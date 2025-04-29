require("dotenv").config({path: "mysql/.env.test"})
const mysql = require("./mysql");
const xlsx = require("xlsx");

const getData = async () => {
    const customerList = await mysql.query("customerList");

    return customerList
}

const createXlsx = async () => {
    // 원본 엑셀파일이 없기 때문에 가상의 워크북을 만드는 것
    const workbook = xlsx.utils.book_new();
    const customerList = await getData();
    const firstSheet = xlsx.utils.json_to_sheet(customerList, {
        header: ['id', "name", "phone", "address"],
        skipHeader: false
    })
    firstSheet["!cols"] = [
        {wpx: 100},
        {wpx: 200},
        {wpx: 150},
        {wpx: 200}
    ]
    
    xlsx.utils.book_append_sheet(workbook, firstSheet,"product category")
    xlsx.writeFile(workbook, "./xlsx/product_category.xlsx")
}

createXlsx();