// 방법 1
// const coffee = function() {
//     alert("주문하신 아메리카노 나왔습니다.");
// }

// function order() {
//     setTimeout(coffee, 5000);
// }

// btn2.addEventListener('click', order);


// 방법2 
// function coffee() {
//     alert("주문하신 아메리카노 나왔습니다.");
// }

// function order() {
//     setTimeout(coffee, 5000);
// }

// document.getElementById('btn2').addEventListener('click', function() {
//     order();
// });



// 방법3
btn2.addEventListener("click", function() {
    setTimeout(function() {
        alert("주문하신 아메리카노 나왔습니다.");
    }, 5000);
});