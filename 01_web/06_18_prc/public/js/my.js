// 전체 페이지를 새로 고침하지 않고도 웹 페이지의 일부를 업데이트할 수 있도록 하기위해 XHR 객체를 사용해 비동기 접근을 함


// [1. 직접 접근]
testBtn.addEventListener('click', async function() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() { // onreadystatechange 이벤트는 서버로부터 응답이 도착할 때마다 호출됨
        // readyState 프로퍼티는 서버와의 통신 상태를 나타냄
        // 0: 초기화되지 않음
        // 1: 로드 중
        // 2: 로드 됨
        // 3: 상호작용 중
        // 4: 완료됨
        // status 프로퍼티는 서버로부터 받은 HTTP 상태 코드를 나타냄
        // 200: 성공
        // 404: 찾을 수 없음
        // 500: 서버 오류
        if(this.readyState == 4 && this.status == 200) {
            testDiv.innerHTML = this.responseText;
            document.getElementById('testDiv').innerHTML = this.responseText;

            // 브라우저 콘솔
            console.log(xhttp.responseText);
        } else {
            console.log(this.status);
        }
    };

});


// [2. Fetch API를 사용한 간접 접근]
// testBtn.addEventListener('click', async function () {
//     try {
//         const response = await fetch('/list');

//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }

//         const data = await response.text();

//         console.log(data);

        
//     } catch (error) {
//         console.log('Fetch error : ', error);
//     }
// });
