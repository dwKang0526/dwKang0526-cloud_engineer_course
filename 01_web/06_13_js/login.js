let userName = '홍길동';
let userPW = '1111';

function accout(userId, userName) {
    let savedName = '홍길동';
    let savedPW = '1111';

    if(userId == savedName) {
        console.log('반갑습니다. ' + savedName + '님');
    } else if(userPW == savedPW) {
        console.log('PW가 틀렸습니다.');
    } else {
        console.log('ID가 틀렸습니다.');
    }
}

accout(userName, userPW);