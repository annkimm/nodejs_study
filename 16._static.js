const express = require('express')
const app = express();

// http://localhost:3000/images/sch2.png와 같은 방식으로 확인 가능
app.use(express.static("public"));

// http://localhost:3000/static/images/sch2.png 같은 방식으로 확인 가능
app.use("/static", express.static("public"))
// 예를 들면, 쇼핑몰을 구현하면 프론트엔드에서 제품을 판매하는 상인들이 상품의 이미지를 등록할 때, 이미지가 노드로 구성된 특정된 폴더에 쌓이는데, 나중에 제품 상세 화면이나 리스트에서 볼 수 있어야 하는데, HTML에 이미지 태그의 src로 보여줘야하는 경우에 static을 사용
// 서버의 업로드된 이미지 파일에 대해서 브라우저에서 접근가능하도록 정적 리소스를 열어줘야만 접근이 가능

app.listen(3000, () => {
    console.log('서버 시작');
    
})
