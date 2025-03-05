const os = require("os");

// cpu 아키텍쳐 정보를 보여줌
console.log(os.arch());

// cpu 코어 정보를 보여줌
console.log(os.cpus());

// 운영체제 호스트명 정보를 보여줌
console.log(os.hostname());

// 운영체제 정보를 보여줌
console.log(os.type());

// 임시 파일 저장 경로를 알려줌
console.log(os.tmpdir());
// 특정 디렉토리를 저장하는 게 귀찮은 경우, 임시로 쓰는 파일을 저장했다가 삭제하는 케이스로 많이 씀 
