

console.log('while loop');
// while loop
let i = 1;
while(i < 10) {
    console.log("2 * " + i + " = " + 2 * i);
    i++;
}

console.log('---------------------------------');
console.log('조건이 있는 while loop');

// 조건이 있는 while loop
let value = 0;
while(value < 101) {
    if (value > 100) {
        break;
    }
    console.log('value: ' + value);
    value++;
}

console.log('value는 100보다 크다.');


console.log('---------------------------------');
console.log('while loop - continue');

// while loop - continue
let val = 0;
while(val <= 10) {
    val++;
    if (val % 2 === 0) {
        continue;
    }
    console.log('val: ' + val);   
}

console.log('---------------------------------');
console.log('중첩 while loop : 6단 제외');

// 중첩 while loop
let dan = 2;
while(dan < 10) {
    let num = 1;
    while(num < 10) {
        // 6단 제외
        if(dan == 6 && num == 1) {
            break;
        }
        console.log(dan + ' * ' + num + ' = ' + dan * num);
        num++;
    }
    dan++;
}

console.log('---------------------------------');
console.log('while loop - label 사용 (라벨명은 아무거나 가능)');

// while loop - labeled (라벨명은 아무거나 가능)
let dan2 = 2;
outside: while(dan2 < 10) { 
    let num2 = 1;
    while(num2 < 10) {
        // 5단까지만 출력
        if(dan2 == 6 && num2 == 1) break outside;
            
        console.log(dan2 + ' * ' + num2 + ' = ' + dan2 * num2);
        num2++;
    }
    dan2++;
}