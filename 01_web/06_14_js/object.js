// [객체 생성]

// 방법1. new Object() 사용
// let dic = new Object();

// 속성 추가
// dic.boy = '소년';   
// dic.girl = '소녀';
// dic.friend = '친구';


// 방법2. {} 사용
let dic = {
    // 속성 추가
    boy: '소년',
    girl: '소녀',
    friend: '친구',
}

console.log(dic.boy);
console.log(dic);

// 속성 삭제
delete dic.girl;
console.log(dic);

// 속성 수정
dic.boy = '남자아이';
console.log(dic);

//
// dic = {}; // 
// dic.apple = "사과";
// dic.ten = 10;
