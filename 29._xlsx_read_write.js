const xlsx = require("xlsx");
const workbook = xlsx.readFile("./xlsx/sample.xlsx") // 엑셀 파일을 읽고, 메모리상에 워크북 생성
const firstSheetName = workbook.SheetNames[0] // 첫번째 시트 이름
const firstSheet = workbook.Sheets[firstSheetName] // 첫번째 시트
console.log(firstSheet["A2"].v);
/*
{
  t: 's', => string
  v: 'John Doe',
  r: '<t>John Doe</t>',
  h: 'John Doe',
  w: 'John Doe'
}
*/

firstSheet['B2'].v = "john@gmail.com" // 이메일 주소 변경
firstSheet['A3'] = {t: "s", v: "Jane Doe"}
firstSheet["B3"] = {t: "s", v: "jane@gmail.com"}
firstSheet["C3"] = {t: "s", v: "010-0000-0000"}
xlsx.writeFile(workbook, "./xlsx/sample2.xlsx")

// 이메일로 레터를 보낼 때 받는 사람, 날짜만 바뀌기 떄문에
// 엑셀 시트로 만들어놓고 그 셀만 db에서 고객명을 읽어드린 다음에 표준 템플릿을 엑셀로 만들어 놓고 파일을 읽은 다음에 워크북을 만들어서 바꿔야하는 부분만 바꾼 다음에 각각의 고객명의 레터를 pdf화 시켜서 for문을 돌려서 보낼 수 있도록 만드는 것 

