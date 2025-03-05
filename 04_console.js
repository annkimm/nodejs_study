const fs = require('fs'); // filesystem
const { Console, error } = require('console');

// 파일에다가 스트림을 생성할 것
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');

const logger = new Console({stdout: output, stderr: errorOutput});
const count = 5;

// %d에 count가 들어감
logger.log('count: %d', count);
logger.error('count: ' + count);

// 실행했을 때 파일이 생성되면서 그 안에 위의 로그가 들어감

console.log("Hello world");
const world = "world";
console.log(`hello ${world}`);

console.error("에러 메세지 출력");
console.error(new Error("에러 메세지 출력"));

const arr = [
    { name: "John Doe", Email: "John@naver.com"},
    { name: "John Doe", Email: "John@naver.com"}
];

console.log(arr);
console.table(arr);

const obj = {
    students: {
        gradle1: { class: {}, class2: {}},
        gradle2: { class: {}, class2: {}},
        teachers: ["John Doe", "Jane Doe"]
    }
}

console.log(obj);
// depth가 많은 데이터의 경우 아래로 설정할 경우 알아보기 쉽다.
console.dir(obj, { depth: 1, color: true});

// 코드가 어디에서 시간을 잡아먹는지, 그러니까 누수가 일어나고 있는지 알 수 있다.
// time~ timeEnd 사이에 있는 코드가 얼마나 시간이 소요되는지를 알 수 있다.
console.time("func 1");

for (let i = 0; i < 9999; i++) {
    // 특정 코드
    
}

console.timeEnd("func 1");

