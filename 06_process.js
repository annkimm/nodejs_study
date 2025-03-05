const process = require("process");
// 특정 이벤트가 발생할 때마다 캐치하기 위해 리스너를 등록해서 사용할 수 있게 하는 모듈

// 노드 프로세스 환경 정보 확인 가능
console.log(process.env);

// 노드 프로세스 종료 직전에 구현하고 싶다면 beforeExit로 구현 가능
process.on("beforeExit", (code) => {
    console.log("beforeExit 리스너", code);
})

// 노드 프로세스 종료 시점에서 구현가능
process.on("exit", (code) => {
    console.log("exit 이벤트 리스너", code);
})

console.log("1. 콘솔에 출력되는 첫번째 메세지");
console.log("2. 콘솔에 출력되는 두번째 메세지");

//forever라는 모듈을 사용하면 예기치 못한 에러가 났을 때 재시작
// beforeExit를 사용해서 웹서버를 재가동 가능
// 많이 사용하지는 않지만, 알아두면 분명히 도움이 되는 모듈