const crypto = require("crypto");

const pwd = "pw1234";
// createHash - 암호화 알고리즘
// digest - 인코딩 방식
const cryptoPW =crypto.createHash("sha512").update(pwd).digest("base64");

console.log(cryptoPW);

// digest - 인코딩 방식
const cryptoPW2 =crypto.createHash("sha512").update(pwd).digest("hex");

console.log(cryptoPW2);

// 해커가 레인보우 테이블을 가지고 있다고 하더라도, 원래 평문을 굉장히 알기 어렵게 처리해야함
// 그 중 하나가 salting 암호화를 많이 씀

// salting을 만들기
const createSalt = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64,(error, bur) => {
            if(error) reject(error);

            // 일반 문자열로 전환하는데 그걸 64바이트로 변환하겠다.
            resolve(bur.toString("base64"));
        })
    })
}

const createCryptoPWD = async (plainpwd) => {
    const salt = createSalt();

    return new Promise((resolve, reject) => {
        // pbkdf2: 솔팅할 때 만드는 알고리즘에 사용하는 함수
        // 암호화할 평문, salt, 반복횟수, 출력할 바이트 수, 해시 알고리즘, 콜백함수
        crypto.pbkdf2(plainpwd, salt, 100000, 64, "sha512", (err, key) => {
            if (err) reject(err);

            resolve({password: key.toString("base64"), salt: salt})
        })
    })
}

const getCryptoPWD = async (plainpwd, salt) => {
    return new Promise((resolve, reject) => {
        // pbkdf2: 솔팅할 때 만드는 알고리즘에 사용하는 함수
        // 암호화할 평문, salt, 반복횟수, 출력할 바이트 수, 해시 알고리즘, 콜백함수
        crypto.pbkdf2(plainpwd, salt, 100000, 64, "sha512", (err, key) => {
            if (err) reject(err);

            resolve({password: key.toString("base64"), salt: salt})
        })
    })
} 

// 사용자가 로그인 하는 시점에 비밀번호를 입력하면
// 사용자 로그인, 비밀번호
// 데이터베이스에서 사용자 아이디를 조건으로 데이터베이스에 저장되어 있는 암호화된 비밀번호와 salt
// getCryptoPWD에 로그인시 입력한 비밀번호 평문과 데이터베이스에서 조회한 salt 값을 전달
// 데이터베이스에 저장된 암호화된 비밀번호와 getCryptoPWD 함수로 전달받은 암호화된 pwd 값이 같은지 확인
// 같으면 로그인 처리

// 1. 아이디와 평문 비밀번호 전달시
// 2. 아이디에 해당하는 salt, 암호화된 비밀번호를 DB에서 확인
// 3. getCryptoPWD에 DB에 저장되어 있는 salt와 전달받은 평문 비밀번호를 돌려서 나오면 DB에 저장되어 있는 암호화된 비밀번호와 일치하는지 확인
// 4. 일치시 로그인 처리 
