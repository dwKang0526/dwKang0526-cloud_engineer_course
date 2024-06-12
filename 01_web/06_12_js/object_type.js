// [[오브젝트형]]

// [Call by Value (값에 의한 호출)]
// 기본 데이터 타입(원시 타입)인 경우, 자바스크립트는 값을 복사해서 함수에 전달한다. 
// 즉, 함수 내에서 인자의 값을 변경해도 원래 변수에는 영향을 미치지 않는다. 
// 기본 데이터 타입에는 숫자, 문자열, 불리언, null, undefined, 심볼 등이 포함된다.

// 예시 1
function modifyValue(x) {
    x = 20;
    console.log('Inside function:', x); // Inside function: 20
}

var a = 10;
modifyValue(a);
console.log('Outside function:', a); // Outside function: 10

// 예시 2
function modifyValue(x) {
    x = 20;
}
var a = 10;
modifyValue(a);
console.log(a); // 10


// [Call by Reference (참조에 의한 호출)]
// 참조 데이터 타입인 경우, 자바스크립트는 객체의 주소를 복사해서 함수에 전달한다.
// 즉, 함수 내에서 객체의 속성을 변경하면 원래 객체에도 영향을 미친다.
// 참조 데이터 타입에는 객체, 배열, 함수 등이 포함된다.

// 예시 1
function modifyObject(obj) {
    obj.name = 'Alice';
    console.log('Inside function:', obj); // Inside function: { name: 'Alice' }
}

var person = { name: 'Bob' };
modifyObject(person);
console.log('Outside function:', person); // Outside function: { name: 'Alice' 

// 예시 2
function modifyObject(obj) {
    obj.name = 'Alice';
}
var person = { name: 'Bob' };
modifyObject(person);
console.log(person); // { name: 'Alice' }




