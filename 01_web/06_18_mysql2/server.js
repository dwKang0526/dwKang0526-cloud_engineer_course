// MySQL 연동
var mysql = require("mysql");
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "myboard"
});

conn.connect(function(err){
    if(err){
        console.log("Mysql Connection Error");
    }else{
        console.log("Mysql Connection Success");
    }
});

// conn.connect();

// 1. express 모듈을 가져온다. (설치된 모듈은 Package.json 파일에 기록됨 - dependencies에 기록됨)
// require => import 라고 생각하면됨
// require('사용할 라이브러리 이름')
const express = require('express');
const app = express(); // app = server

// express()에 있는 라우터를 사용하는데
// 이 라우터는 모든 요청을 인터셉트하기 때문에 찾지 못함, 그래서 미들웨어를 사용

// 미들웨어
app.use(express.static('public')); // public 폴더를 static 폴더로 사용하겠다.

app.listen(8080, function(){
    // 콜백 받아서 서버가 실행되면 실행할 코드
    console.log('Server is running on 8080 port');
});


// 라우팅
// app.get('/', function(req, res){
//     // res.send('Hello World');
//     res.send(__dirname+"/public/index.html");
// });

app.get('/list', function(req, res){

    // 비동기이기 때문에 콜백함수를 사용해야 한다.
    // 아래 코드는 동기적으로 실행되기 때문에 사용할 수 없다.
    // 아래 코드를 실행시키고 조회되는 동안 다음 코드를 실행시키기 때문에 rows에 값이 없다.
    // const rows = conn.query("select * from post", function(err, rows, fields){
    //     if(err){
    //         console.log("Query Error");
    //         throw err;
    //     }else{
    //         console.log(rows);
    //         // console.log(fields);
    //     }
    // });

    // res.send(rows);

    // 올바른 코드
    conn.query("SELECT * FROM post p join post_bk pb ON p.id = pb.id", function(err, rows, fields){
        if(err){
            console.log("Query Error");
            throw err;
        }else{
            console.log(rows);
            // console.log(fields);

            // rows를 json으로 변환해서 보내준다.
            res.send(rows);
        }
    });

    
});
