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

