// var, let, consts

// var savedUser = "홍길동";
// var savedUser = "임꺽정";

// let
// let savedUser = "홍길동";
// savedUser = "고길동";
// function account() {
//     var savedUser="홍길동";
//     savedUser = "메소드 안에서 변경된 값";
//     console.log('반갑습니다. ' + savedUser + '님');
// }

// account();
// console.log('또 오셨네요.' + savedUser +'님');


// 전역 변수
// function account(userId) {
//     let savedUser = "홍길동";
//     if(userId === savedUser) {
//         console.log('반갑습니다. ' + savedUser + '님');
//     } else {
//         console.log('FAIL');
//     }
// }

// account('홍길동');


function account(userId) {
    // let savedUser = "홍길동";
    let savedUser = new String('홍길동');
    if(userId === savedUser) {
        console.log('반갑습니다. ' + savedUser + '님');
    } else {
        console.log('FAIL');
    }
}

account('홍길동');
// account (new String('홍길동'));
