var id = "apple";
var pw = "1234";
var result = (id == "apple" && pw == "1234") ? "로그인 성공" : "로그인 실패";
var resultId = (id ?? null) ? "아이디가 입력되었습니다." : "아이디가 입력되지 않았습니다.";
console.log(result); // 로그인 성공

console.log(!"apple");
console.log(!null);
console.log(!0);
console.log(!1);