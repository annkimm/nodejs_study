function add(a, b) {
    return a + b;
}

function minus(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function divd(a, b) {
    return a / b;
}

const defaultNum = 1;

// 자바스크립트를 기능별로 묶어 놓은 것 -> module
// 그렇게 해서 다른데서 import해서 가져다가 사용할 수 있음
// 외부에서 사용할 함수나 변수는 밑에처럼 export를 해야 다른데서 import해서 사용 가능
// import해서 가져다 쓰게 되면, 브라우저처럼 js 통채로 가져올 필요가 없어서 파일 크기가 줄어듦
module.exports = {
    add,
    minus,
    mul,
    divd,
    defaultNum
}