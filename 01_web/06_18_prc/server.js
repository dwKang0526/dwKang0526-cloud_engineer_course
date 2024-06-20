// MySQL 연동
var mysql = require("mysql"); // mysql 모듈을 가져온다.
var conn = mysql.createConnection({ // mysql 모듈을 이용해서 connection 객체를 생성
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "myboard"
});

conn.connect();

const express = require("express");
const app = express();

app.use(express.static("public"));

app.listen(8080, function () {
    console.log("서버 준비 완👍");
});

// [라우팅]

app.get("/list", function(req, res) { // 파라미터 (req : 클라이언트로부터의 요청 정보, res : 서버가 클라이언트에게 응답을 보낼 때 사용)
    conn.query("select * from post", function (err, rows, fields) { // 콜백 함수 (err : 에러 객체, rows : 결과 행 배열, fields : 필드 정보 배열)
        if (err) throw err;
        console.log(rows);
    });
});

