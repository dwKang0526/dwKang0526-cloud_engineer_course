// 반복문 for
for(var i = 1; i < 10; i++) {
    console.log("2 * " + i + " = " + 2 * i);
}

// 초기화가 없는 for 루프
var i = 0;
for(; i < 101;) {
    console.log('충전중' + i + '%');
    i += 10;
}

// 
var arr = [];
console.log(arr.length);

for (let i = 0; i < 10; i++) {
  arr.push("2 * " + i + " = " + 2 * i);
}

console.log(arr.length);

for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    console.log(element);
}