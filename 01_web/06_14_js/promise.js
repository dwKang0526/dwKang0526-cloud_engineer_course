// function c() {
//     console.log('c');
// }

// function b() {
//     console.log('b');
// }

// function a() {
//     console.log('a');
// }

// setTimeout(a, 3000); // 이렇게 수행할꺼야 전략만 가지고 아랫줄로 내려감
// setTimeout(b, 2000); // 이렇게 수행할꺼야 전략만 가지고 아랫줄로 내려감
// setTimeout(c, 1000);

// 결과 c, b, a
// 큐에 쌓이는 순서대로 수행됨



// ------------------------------
// setTimeout(function() {
//     console.log('a');
//     // 2번째 작업
//     setTimeout(function() {
//         console.log('b');
//         // 3번째 작업
//         setTimeout(function() {
//             console.log('c');
//         }, 1000);
//     }, 2000);
// }, 3000);

// 결과 a, b, c

// var pro1 = new Promise(function(resolve, reject) {
//     if (true) resolve(); 
//     else { } // reject();
// });

// pro1
//     .then(function() {
//         console.log(1);  
//     })
//     .catch(function() {
//         console.log(2);
//     });



// ------------------------------
// var pro1 = new Promise(function(resolve, reject) {
//     if (true) resolve(1); // 서버로 보내고 받아온 데이터 // 원래였으면 서버로 보내고 다음 줄(pro1.then)로 내려가야하는데 Promise가 있어서 서버에 보내놓고 다음 줄로 내려가지 않고 기다림
//     else { }
// });

// pro1
//     .then(function(value) {
//         console.log(value);  
//     })
//     .catch(function() {
//         console.log(errMsg);
//     });

// ------------------------------

// var pro1 = new Promise(function(resolve, reject) {
//     if (false) { } // 서버로 보내고 받아온 데이터 // 원래였으면 서버로 보내고 다음 줄(pro1.then)로 내려가야하는데 Promise가 있어서 서버에 보내놓고 다음 줄로 내려가지 않고 기다림
//     else { }
// });

// pro1
//     .then(function(value) {
//         console.log(value);  
//     })
//     .catch(function() {
//         console.log(errMsg);
//     });

// ------------------------------

// function f() {
//     var pro1 = new Promise(function(resolve, reject) {
//     if (false) { }
//     else reject('처리 오류');;
// });
//     return pro1;
// }

// const prom = f();

// prom
//     .then(function(value) {
//         console.log(value);  
//     })
//     .catch(function() {
//         console.log(errMsg);
//     });

    //  ------------------------------
// TODO 수정 필요

// function f() {
//         return new  = new Promise(function(resolve, reject) {
//         if (false) { }
//         else reject('처리 오류');;
//     });
// }

// const prom = f();

// prom
//     .then(function(value) {
//         console.log(value);  
//     })
//     .catch(function() {
//         console.log(errMsg);
//     });

// ----------------------------------------------


// function f() {
//         return new  Promisse((resolve, reject) => {
//         if (false) { }
//         else reject('처리 오류');;
//     });
// }

// const prom = f();

// prom
//     .then(function(value) {
//         console.log(value);  
//     })
//     .catch(function() {
//         console.log(errMsg);
//     });

// ----------------------------------------------

// function f() {
//         return new  Promisse((resolve, reject) => {
//         if (flag) { 
//             setTimeout(resolve, 3000);
//         } else {
//             reject('처리 오류');;
//         }
//     });
// }

// const prom = f(true);

// prom
//     .then(function() {
//         console.log('a');  
//     })
//     .catch(function(errMsg) {
//         console.log(errMsg);
//     });

// ----------------------------------------------

// setTimeout(function () {
//   console.log("a");
//   //2번째 작업
//   setTimeout(function () {
//     console.log("b");
//     //3번째 작업
//     setTimeout(function () {
//       console.log("c");
//     }, 1000);
//   }, 2000);
// }, 3000);

function f(flag, time) {
  return new Promise((resolve, reject) => {
    if (flag) {
      setTimeout(resolve, time);
    } else {
      reject("처리 오류");
    }
  });
}

f(true, 3000)
  .then(function () {
    console.log("a");
    return f(true, 2000);
  })
  .then(function () {
    console.log("b");
    return f(true, 1000);
  })
  .then(function () {
    console.log("c");
  })
  .catch(function (errMsg) {
    console.log(errMsg);
  });