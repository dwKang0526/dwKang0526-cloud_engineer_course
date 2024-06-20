testBtn.addEventListener('click', async function() {
    // 직접 접근
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     // 4: request finished and response is ready
    //     if (this.readyState == 4 && this.status == 200) {
    //         // testDiv.innerHTML = this.responseText;
    //         // document.getElementById('testDiv').innerHTML = this.responseText;
    //         // 브라우저 console
            
    //         console.log(xhttp.responseText);
    //         // this = xhttp
    //         // console.log(this.responseText);
    //     }
    // };

    // // xhttp 설정 (요청 준비하기)
    // // http://localhost:8080/list
    // xhttp.open('GET', '/list', true); // true: 비동기, false: 동기
    // // 요청 보내기
    // xhttp.send();

    // 간접 접근 Fetch API
    // promise method에는 then, catch 두가지가 있다

    // async : 비동기 함수
    // await : 비동기 함수 안에서만 사용 가능, 비동기 함수가 끝날 때까지 기다린다

    // await 를 빼먹으면 fetch가 끝나기도 전에 다음 코드가 실행되기 때문에 팬딩된 객체(promised object)가 반환된다.
    let resObj = await fetch('/list'); 
    
    let data = await resObj.json();
    // console.log(data);

    let displayData = 
    `<thead>
        <td>ID</td>
        <td>Title</td>
        <td>Writer</td>
        <td>Created</td>
    </thead>
    <tbody>`;
    
    data.forEach((item, index) => {
        displayData += 
        `<tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.writer}</td>
            <td>${item.profile_id}</td>
        </tr>`;
    })
    displayData += '</tbody>';

    // 모달 테스트
    // let modalData = '';
    // modal 로 들어갈 writer 정보
    // data.forEach((item, index) => {
    //     modalData += `${item.content}</br>`;
    // })

    document.getElementById('datatablesSimple').innerHTML = displayData;
    // document.getElementById('modal-content').innerHTML = modalData;

    // 각 title에 이벤트 리스너 추가
    document.querySelectorAll('.title-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let content = this.getAttribute('data-content');
            document.getElementById('modal-content').innerHTML = content;
            let modal = new bootstrap.Modal(document.getElementById('myModal'));
            modal.show();
        });
    });
});

// Promise {<pending>} : 팬딩된 객체이다. 
// 동기함수를 썼을 때 발생하는 현상 -> fetch가 끝나기도 전에 다음 코드가 실행되기 때문에
// 해결 : await 사용하면 fetch가 끝날 때까지 기다린다.


// 내장 속성
// innerHTML : 태그 안의 내용을 가져오거나 설정
// innerText : 태그 안의 내용을 가져오거나 설정