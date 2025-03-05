const fs = require("fs");
// 파일 시스템의 약자
// fs는 비동기, 동기 함수 둘 다 존재, 쌍으로 같이 움직임

// 파일 경로, 파일 안에 있는 charaterset 방식
// 기본적으로 비동기 함수: readFile
fs.readFile("./sample/text.txt", "utf-8", (err, data) => {
    if (err) {
        throw err;
    } 

    console.log(data);
})

console.log('1111');


// readFileSync: 동기함수
const data = fs.readFileSync("./sample/text.txt", "utf-8");

console.log(data, 1);

const txt = "파일 쓰기 테스트";
const txt2 = "파일 쓰기 테스트2";

fs.writeFile("./sample/txt_w.txt", txt, "utf-8", (err) => {
    if (err) {
        throw err;
    }

    const data2 = fs.readFileSync("./sample/txt_w.txt", "utf-8");

    console.log(data2);
});

fs.writeFileSync("./sample/txt_w3.txt", txt2, "utf-8");

const data3 = fs.readFileSync("./sample/txt_w3.txt", "utf-8");

console.log(data3);

// 동기는 속도가 더 빠르나, 다른 걸 할 수 없고,
// 비동기는 속도는 조금 더 느리나, 다른 코드를 실행할 수 있음