postBtn.addEventListener('click', async function() {

    try{


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
            <td><a href="#" class="title-modal" data-content="${item.content}">${item.title}</a></td>
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
    // document.getElementById('modal-content').innerHTML = modalData;

    document.getElementById('datatablesSimple').innerHTML = displayData;


    // 모든 .title-modal-link 요소들을 선택
    let rowData = document.querySelectorAll('.title-modal');
    

    // 각 title에 클릭 이벤트 리스너를 추가
    // rowData.forEach(function(data) {
        
    //     data.addEventListener('click', function(event) {
    //         // 기본 동작 막기
    //         event.preventDefault();

    //         console.log(data.getAttribute('data-content'));
    //         // data-content 속성에서 content 정보 가져오기.
    //         let content = data.getAttribute('data-content');

    //         // 모달의 콘텐츠 부분을 업데이트합니다.
    //         let modalContent = document.getElementById('modal-content');
    //         modalContent.innerHTML = content;

    //         // 모달을 생성하고 표시합니다.
    //         let modalElement = document.getElementById('myModal');
    //         let modal = new bootstrap.Modal(modalElement);
    //         modal.show();
    //     });
        
    // });

    
        rowData.forEach(function(element, idx) {
            // console.log(`Element ${idx}:`, element);

            // 클릭 이벤트 리스너 추가
            element.addEventListener('click', function(event) {
                // 기본 동작 막기(안 막으면 클릭한 모달 뒤 화면이 이동됨)
                event.preventDefault();

                // content 정보 가져오기.
                // console.log(element.getAttribute('data-content'));
                let content = element.getAttribute('data-content');

                // 모달의 내용 content로 변경
                let modalContent = document.getElementById('modal-content'); // 아무것도 없음
                // console.log(`content : ${content}`);
                modalContent.innerHTML = content;

                // 모달을 생성하고 표시합니다.
                let modalElement = document.getElementById('myModal');
                let modal = new bootstrap.Modal(modalElement);
                modal.show();
            });
        });
        
        } catch(e){
            alert('게시물 조회 실패');
            console.log(e);
        }
});