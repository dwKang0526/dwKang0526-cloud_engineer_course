// [[Object]]

// [] 스페어키
// {} 브레이스

// var msg = {
//     name: '홍길동',
//     comment: '정의로운 도둑',
//     age: 20,
// };

// console.log(msg);
// console.log(typeof msg);


// var array = [];
// console.log(array);
// console.log(typeof array);

// array.push(msg);
// array.push(msg);

// console.log(array);


// --------------------------------------------------


var msg = new Object();
msg = {
    name: '홍길동',
    comment: '정의로운 도둑',
    age: 20,
};

var array = new Array();
array.push(msg);
array.push(msg);

console.log(array);
console.log(typeof array);