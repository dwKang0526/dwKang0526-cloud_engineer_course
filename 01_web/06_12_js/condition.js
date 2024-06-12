const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('프로그래밍 언어 이름을 입력하세요', 
//     function(data){
//         console.log( "가장 좋아하는 프로그래밍 언어는 [" + data + "] 입니다.");
//         // 데이터 누수 방지
//         rl.close();
//     });

// rl.question('정수를 입력하시오 : ', function(num) {
//     if(num % 2 == 0) {
//         console.log("짝수입니다.");
//     } else {
//         console.log("홀수입니다.");
//     }
//     rl.close();
// });

rl.question("문자를 입력하세요 : ", function(ch) {
    ch = ch.toLowerCase();
    if(ch == 'y') {
        console.log("네, 드라이브를 포맷합니다.");
    } else if (ch == 'n') {
        console.log("아니오. 드라이브를 포맷하지 않겠습니다.");
    } else {
        console.log("유효하지 않은 문자입니다.");
    }
    rl.close();
});