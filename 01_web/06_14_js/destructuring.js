// Array Destructuring

// 1. 
// const color = ['red', 'green', 'blue'];
// let [r, g, b] = color;

// console.log(r);
// console.log(g);
// console.log(b);

// 배열 순서 변경
// [b, g, r] = [r, g, b];


// 2. 
// const [r, g, b] = ['red', 'green'];

// 3. 
// const [r, g, b = 'blue'] = ['red', 'green'];

// 4.
// const [r, g, b = 'blue'] = ['red', 'green', 'aaa'];

// console.log(r);
// console.log(g);
// console.log(b);

// 5.
const [a, b, ...rest] = ['C#', 'Java', 'Python', 'JavaScript', 'Ruby'];
console.log(a);
console.log(b);
console.log(rest.length);
console.log(rest);
console.log(rest[0]);
console.log(rest[1]);
console.log(rest[2]);

// 6. 배열끼리의 결합
const arr1 = ['C#', 'Java'];
const arr2 = ['Python', 'JavaScript', 'Ruby'];
// 값만 결합
const arr3 = [...arr1, ...arr2];
// 배열 자체를 결합 (2차배열)
const arr4 = [arr1, arr2];

console.log(arr3);
console.log(arr4);

// 7. 배열의 교체
// let {id, pw, name, age} = { id:'a', pw:'b', name:'c', age:20 };
// console.log(id);

// 8. 
// let user = {
//     name : '잠수함',
//     age : 30,
// }

// let {id = 'guest', pw = '0000', name, age} = user;
// console.log(id);
// console.log(pw);
// console.log(name);
// console.log(age);

let user = {
    id : 'a',
    pw : 'b',
    name : 'c',
    age : 20,
};

let {id, age, ...user2} = user;
console.log(id);
console.log(user2); // user2는 id, age를 제외한 나머지 속성을 가지고 있음
// console.log(user, pw);
// console.log(user, name);
console.log(user, age);