
// local area
function account() {
    // 지역 변수
    var saveUser = '홍길동';
    console.log('반갑습니다. ' + saveUser + '님');
}

account();

// 지역 변수에 선언되어 있기 때문에 에러가 발생한다.
// console.log('또 오셨네요.' + saveUser +'님'); // saveUser is not defined



// 지역변수의 생명주기
function naver() {
    console.log('naver 함수 진입');
    let saveUser = '홍길동';
    google();
    console.log('naver 함수 탈출');
    
}

function google() {
    console.log('google 함수 진입');
    let saveUser = '또치';
    console.log('google 함수 탈출');
}

naver();

