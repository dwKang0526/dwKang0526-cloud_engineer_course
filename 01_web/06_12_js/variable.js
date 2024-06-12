
// [[javascript 변수 선언 및 특징]]

// [변수 선언]
// 컴파일 기반의 언어의 경우 처음에 한 번 타입이 결정된 변수에는 해당 타입의 값이 아니면 컴파일에러가 발생하지만 
// 자바스크립트는 동적 타이핑(dynamic typing)을 사용하는 언어이기 때문에 변수에 할당된 값의 타입이 변경될 수 있다.
var msg = 'hello world';
// msg = 100;
var count = 100;
msg = count
console.log(msg);


// 타입 확인
var myAge = 32;
var myHeight = 160;
console.log(typeof myAge);
console.log(typeof myHeight);

/** 
 * 자바스크립트에서는 연산이 실패할 때 NaN 값을 반환한다.
 * 자바스크립트가 웹 브라우저 내에서 렌더링과 사용자 인터랙션을 주로 처리하기 때문에, 실행 과정 중에 오류가 나더라도 프로그램이 중단되지 않도록 하기 위함이다. */
var myStrAge = "서른둘";
console.log(myStrAge / 2);


// [문자열형]
// 문자열은 문자들의 집합이며, 작은 따옴표('')나 큰 따옴표("")로 감싸서 표현한다.
console.log(myStrAge.length);


// [boolean]
// boolean은 true 또는 false 값을 가지는 데이터 타입이다.
var bigger = 100 > 50;
console.log(bigger);
bigger = 100 < 50;
console.log(bigger);

// [null]
// null은 객체가 없음을 의미하며, 객체가 없음을 나타내는 데 사용된다.
var love = null;
console.log(love);
console.log(Boolean(love));

// [undefined]
// 변수를 선언하고 값을 할당하지 않으면 undefined가 출력된다.
var name;
console.log(name);

// null과 undefined의 차이점
// null은 의도적으로 값이 없음을 나타내는 것이고, undefined는 값이 할당되지 않은 것을 나타낸다.