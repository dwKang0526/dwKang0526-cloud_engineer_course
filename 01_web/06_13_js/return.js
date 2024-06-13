const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function checkAge(age) {
    if(age > 19) {
        return true;
    } else {
        return false;
    }
}

rl.question("나이를 입력하세요", function (nai) {
    if(checkAge(nai)) {
        console.log('미성년자 입장가능.');
    } else {
        console.log('미성년자 입장불가.');
    }
    rl.close();
});
