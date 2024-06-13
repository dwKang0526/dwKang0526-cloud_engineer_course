// var nickName = function () {
//     console.log("pretty");
// }

// nickName();

// nickName = function () {
//     console.log("cool");
// }

// nickName();




var nickName = function () {
    console.log("pretty");
}
var userName = nickName;
// var userName = nickName(); // ERROR
// [Error이유]
/*
함수 nickName을 호출하고 그 결과를 userName 변수에 할당하려고 시도하고 있지만, 
nickName 함수는 반환값이 없기 때문에 undefined가 된다. 
따라서 userName 변수에는 undefined가 할당되고, 
이후 userName()을 호출하게 되면 undefined is not a function 에러가 발생한다.
*/

console.log(typeof nickName);
console.log(typeof nickName());

userName();
nickName();