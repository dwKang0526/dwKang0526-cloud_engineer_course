// [MySQL 모듈 로드 및 DB 연결]

// mysql import
var mysql = require("mysql"); 
// DB 연결을 위한 설정
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "myboard"
});
// db 연결
conn.connect();


const express = require("express"); // express 모듈 가져오기
const app = express(); // app = server

app.use(express.static("public"));

// app이 8080포트에서 HTTP 요청을 수신 대기하도록 설정
app.listen(8080, function() {
    console.log("i'm ready : )")
});

// 라우터가 모든 요청을 인터셉터하기 때문에 static 요소들에 직접적인 접근이 불가능
// app.get("/", function)~

// 경로 설정
app.get("list", function(req, res) {
    conn.query("select * from post", function (err, rows, fields) {
        if(err) throw err;
        console.log(rows);
    });
});