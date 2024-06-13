// [Switch 문]
var n = 2;
switch (n) {
    case 1:
        console.log(1);
        break;
    case 2:
        console.log(2);
        break;
    default:
        break;
}


// [Switch 문의 활용]
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('C 드라이브를 포맷하겠습니까?', function(answer){
    switch (answer) {
        case 'y':
            console.log('예, 드라이브를 포맷하겠습니다.');
            break;
        case 'n':
            console.log('아이오, 드라이브를 포맷하지 않겠습니다.');
            break;
        default:
            console.log('유효하지 않은 문자입니다.');
            break;
    }
    rl.close();
});


// [Switch 문의 활용 - 숫자로 비교]
rl.question('C 드라이브를 포맷하겠습니까?', function(hotkey){
    switch (parseInt(hotkey)) {
        case 1:
            console.log('예, 드라이브를 포맷하겠습니다.');
            break;
        case 2:
            console.log('아이오, 드라이브를 포맷하지 않겠습니다.');
            break;
        default:
            console.log('유효하지 않은 문자입니다.');
            break;
    }
    rl.close();
});

// [Switch 문의 활용 - 학점 계산]
rl.question('점수를 입력하세요: ', function(score){
    switch (parseInt(score)) {
        case 100:
        case 90:
            console.log('A 학점입니다.');
            break;
        case 80:
            console.log('B 학점입니다.');
            break;
        case 70:
            console.log('C 학점입니다.');
            break;
        case 60:
            console.log('D 학점입니다.');
            break;
        default:
            console.log('F 학점입니다.');
            break;
    }
    console.log(rl.output);
    rl.close();
});