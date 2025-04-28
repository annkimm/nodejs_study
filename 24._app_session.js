// HTTP 통신
// 비연결지향(connectionless) - 클라이언트에서 서버로 요청(request), 섭버가 요청에 대한 응답(response)을 보내고 난 후 연결이 끊어짐
// 상태정보 유지를 안함(stateless) - 통신 이후 바로 연결이 종료되기 때문에 서버는 클라이언트의 상태를 알 수가 없다.

// 로그인 - 클라이언트와 서버간의 로그인 상태를 유지
// 세션과 쿠기를 사용하게 됨

// 쿠키 - 클라이언트에 저장됨(key, value)
// 쿠키이름, 값, 만료시간, 전송할 도메인명, 보안 연결 여부 등

// 1. 클라이언트에서 로그인
// 2. 서버가 이 로그인 유효한지 검증하고, 맞다면 응답헤더에 쿠키 정보를 넣어서 보내줌. 이게 클라이언트 쿠키에 저장
// 3. 클라이언트가 서버에 요청할 때마다 쿠키 정보를 같이 헤더에 넣어서 보낸다.
// 4. id 혹은 sessionid

// 세션 - 서버, 브라우저가 종료되기 전까지 클라이언트의 요청을 유지하게 해주는 기술
// 새션 정보를 express-ssion로 관리

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json({
    limit:"50mb"
}))

app.use(cookieParser());

const sess = {
    secret: "secret key",
    resave: false, // 세션에 변경사항이 없어도 항상 다시 저장할지에 대한 여부
    saveUnintialized: true, // 초기화되지 않은 세션을 저장소에 강제로 저장할지에 대한 여부
    cookie: {
        httpOnly: true, // document.cookie 하면 쿠키 정보를 볼 수 없음
        secure: false, // true - https
        maxAge: 1000 * 60 * 60 // 쿠키가 유지되는 시간
    }
}

app.use(session(sess))

app.post("/api/login", (req, res) => {
    const { email, pw } = req.body.param;
    // 데이터베이스에 전달받은 이메일주소와 비밀번호에 맞는 사용자가 있는지 체크
    // 로그인

    req.session.email = email
    req.session.isLoin = true
    req.session.save(err => {
        if(err) throw err;

        res.send(req.session)
    });
})

app.all("*", (req, res, next) => {
    if(req.session.email) { // 로그인이 되어 있다면
        console.log(req.cookies);
        
        next() // 다음 원래 연결하려던 api로 이동
    } else {
        //res.send.redirect("/login")
        res.send("로그인이후  이용 가능합니다.")
    }
})


app.post("/api/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login"); // 클라이언트 브라우저의 주소로 이동시키겠다.
})


app.listen(3000, () => {
    console.log("서버 시작");
    
})