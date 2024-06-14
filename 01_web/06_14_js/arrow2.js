// [화살표 함수]

// 1. this가 가리키는 것
// let obj = {
//     myVar: 'foo',
//     myFunc: function() {
//         console.log(this.myVar);
//     }
// };


// 2. this가 window를 가리키는 문제
// let obj = {
//     myVar: 'foo',
//     myFunc: function() {
//         console.log(this.myVar); // 수행 컨텍스트가 obj를 가리키고 있음 // foo

//         setTimeout(function() { 
//             console.log(this.myVar); // 수행 컨텍스트가 window를 가리키고 있음 // undefined
//         }, 1000);
//     }
// };


// 3. this가 obj를 가리키도록 하는 방법
// let obj = {
//     myVar: 'foo',
//     myFunc: function() {
//         let self = this;
//         console.log(this.myVar); // 수행 컨텍스트가 obj를 가리키고 있음 // foo

//         setTimeout(function() { 
//             console.log(self.myVar); // 수행 컨텍스트가 obj를 가리키고 있음 // foo
//         }, 1000);
//     }
// };


// 4. bind : this가 obj를 가리키도록 하는 방법
// let obj = {
//     myVar: 'foo',

//     myFunc: function() {
//         console.log(this.myVar); // 수행 컨텍스트가 obj를 가리키고 있음 // foo

//         setTimeout(function() { 
//             console.log(this.myVar); // 수행 컨텍스트가 obj를 가리키고 있음 // foo
//         }.bind(this), 1000);
//     }
// };


// 5. 화살표 함수의 탄생 이유
// 
// let obj = {
//     myVar: 'foo',

//     myFunc: function() {
//         console.log(this.myVar); // 수행 컨텍스트가 obj를 가리키고 있음 // foo

//         setTimeout(() => { // 화살표 함수, function() 객체가 만들어질때 this를 바인딩
//             console.log(this.myVar); // 수행 컨텍스트가 obj를 가리키고 있음 // foo
//         }, 1000);
//     }
// };


// 6. 
let obj = {
    myVar: 'foo',

    myFunc: () => { // 미리 만들어져 바인딩 되지 않고 호출 시 바인딩 됨
        console.log(this.myVar); // 수행 컨텍스트가 window // undefined

        setTimeout(() => { // 화살표 함수, function() 객체가 만들어질때 this를 바인딩
            console.log(this.myVar); // 수행 컨텍스트가 window
        }, 1000);
    }
};


obj.myFunc(); 

// 결론 
// 어떤 객체에 귀속되는 함수(즉, 메소드)를 만들 때는 
// 프로퍼티에 할당되는 함수를 function 키워드로 만들고

// 그 함수 내부에서 호출되는 콜백 함수는 화살표 함수로 만들어라~
// ==>5번 처럼!!!







