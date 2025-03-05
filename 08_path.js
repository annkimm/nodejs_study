const path = require("path");

// 현재 실행되고 있는 파일의 디렉토리 경로 
console.log(__dirname);

// 현재 실행되고 있는 파일 경로
console.log(__filename);

// 경로의 마지막 부분 (파일 이름)
console.log(path.basename(__filename));

// 경로의 마지막 부분에서 확장자를 제거한 파일 이름 출력
console.log(path.basename(__filename, ".js"));

// __filename 대신 다른 경로를 넣을 수 있기 때문에 __dirname와는 다르다.
// 내가 넣은 파일 경로의 디렉토리 경로
console.log(path.dirname(__filename));

// 파일의 확장자
console.log(path.extname(__filename));

// {
//     root: '/',
//     dir: '/home/user/dir',
//     base: 'file.txt',
//     ext: '.txt',
//     name: 'file'
//   }
// 위처럼 출력해줌. 경로를 key, value로 출력해줌
console.log(path.parse("/home/user/dir/file.txt"));

// 파일의 이름을 출력할 때
const path1 = path.parse("/home/user/dir/file.txt");
console.log(path1.name);

// 실제로 이름이나 확장자를 확인하기 위해 많이 씀
// 확장자를 한 번 더 검증하기 위해서
// 실제로 svg인지, jpg인지 등등
// basename,extname, name을 실제로 많이 씀


// 원래 경로를 만들어줌
const path2 = path.format({
        root: '/',
         dir: '/home/user/dir',
         base: 'file.txt',
         ext: '.txt',
         name: 'file'
       })

console.log(path2);

// 여러 단어를 가지고 하나의 경로 체계로 만들어줌
console.log(path.join("/home", "user", "dir", "file.txt"));
