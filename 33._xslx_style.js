//xlsx-js-style
const xlsx = require("xlsx-js-style");

const createXlsx = async () => {
    const workbook = xlsx.utils.book_new();
    const customerList = [
        {name: "고객명", email: "이메일", phone: "연락처"},
        {name: "유재석", email: "zizicoo208@naver.com", phone: "010-0001-0000"},
        {name: "김종국", email: "nyangko29@gmail.com", phone: "010-0001-0001"},
        {name: "송지효", email: "nyangko29@gmail.com", phone: "010-0001-0002"}
    ]

    const firstSheet = xlsx.utils.json_to_sheet(customerList, {
        header: ['name', 'email', 'phone'],
        skipHeader: true
    });

    firstSheet["!cols"]=[
        {wpx: 120},
        {wpx: 200},
        {wpx: 200},
    ]

    firstSheet["A1"].s = {
        font: {
            name: "Calibri",
            sz: 24,
            bold: true,
            color: {rgb: "FF0000"},
        }
    }

    firstSheet["B1"].s = {
        alignment: {
            vertical: "center",
            horizontal: "center",
            wrapText: true,
            textRotation: 180
        }
    }

    firstSheet["C1"].s = {
        border: {
            top: {
                style: "thick",
                color: {rgb: "000"},
            },
            bottom: {
                style: "thick",
                color: {rgb: "000"},
            },
            left: {
                style: "thick",
                color: {rgb: "000"},
            },
            right: {
                style: "thick",
                color: {rgb: "000"},
            }
        }
    }

    firstSheet["A2"].s = {
        fill: {
            patternType: "solid",
            fgColor: {rgb: "eeeeee"},
        }
    }

    xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers");
    xlsx.writeFile(workbook, "./xlsx/customers_style.xlsx")
}

createXlsx();