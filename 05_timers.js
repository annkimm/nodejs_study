// window 객체로 실행되는게 아님 왜냐면 브라우저가 아니기 때문에
// 타이머 모듈로 실행되는 것
const timeout = setTimeout(() => {
    console.log('1초 후에 실행');
}, 1000);

const interval = setInterval(() => {
    console.log("1초마다 실행이 됩니다.");
}, 1000)

setTimeout(() => {
    clearInterval(interval);
}, 3000)

// 위의 시간 함수빼고는
// 한마다로 모든 코드가 실행이 끝난 뒤에 실행되는 함수
const immdiate = setImmediate(() => {
    console.log("setImmediate() 함수 호출 뒤에 오는 모든 코드를 먼저 실행하고 바로 다음에 실행이 됩니다.");
})

console.log('setImmediate 보다 먼저 실행됩니다.');
