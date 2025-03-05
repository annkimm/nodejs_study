// 전역 객체
const myURL = new URL("https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash");

console.log(myURL);
console.log(myURL.username); // account 
console.log(myURL.password); // password

const queryString = myURL.searchParams.get("query");

console.log(queryString);

const myURL2 = new URL("https://example.org?user=abc&query=sdf&sort=asc")

console.log(myURL2.searchParams);
console.log(myURL2.searchParams.get("user"));
console.log(myURL2.searchParams.get("query"));
console.log(myURL2.searchParams.get("sort"));

console.log(myURL2.searchParams.keys());
console.log(myURL2.searchParams.values());

myURL2.searchParams.append("user2", "def");
myURL2.searchParams.append("user", "def");
// 만약에 똑같은 키를 추가해도 원래 있던 키는 유지되지만 추가됨
// 왜냐면 키에 해시값이 다르기 때문에 추가가 가능함

console.log(myURL2.searchParams.getAll("user"));

myURL2.searchParams.set("user", "def");
// 기존의 키를 삭제하고 새로 추가 혹은 업데이트 같은 개념


console.log(myURL2.searchParams);

myURL2.searchParams.delete("user2");

console.log(myURL2.searchParams);

// 문자열로 변환
console.log(myURL2.searchParams.toString());






