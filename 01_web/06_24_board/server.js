const mongoclient = require("mongodb").MongoClient;
const ObjId = require('mongodb').ObjectId;
const url =
  `mongodb+srv://admin:1234@cluster0.tqngyat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let mydb;

mongoclient
  .connect(url)
  .then((client) => {

// let mydb;
    mydb = client.db('myboard');
    // mydb.collection('post').find().toArray().then(result =>{
    //     console.log(result);
    // })

    app.listen(8080, function () {
      console.log("포트 8080으로 서버 대기중 ... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public')); // Static 미들웨어 추가

//body-parser 라이브러리 추가
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
// app.listen(8080, function(){
//     console.log("포트 8080으로 서버 대기중 ... ")
// });
app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
});
app.get("/", function (req, res) {
  res.render("index.ejs");
});
app.get("/list", function (req, res) {
//   conn.query("select * from post", function (err, rows, fields) {
//     if (err) throw err;
//     console.log(rows);
//   });
    list(req, res);
});

function list(req, res) {
  mydb.collection('post')
    .find()
    .toArray()
    .then(result => {
      // console.log(result);
      res.render('list.ejs', { data : result });
    })
}

//'/enter' 요청에 대한 처리 루틴
app.get('/enter', function(req, res){
  // res.sendFile(__dirname + '/enter.html');
  res.render('enter.ejs');
});

//'/save' 요청에 대한 post 방식의 처리 루틴
app.post('/save', function(req, res){

  
  // console.log(req.body.title);
  // console.log(req.body.content);
  //몽고DB에 데이터 저장하기
  // mydb.collection('post').insertOne(
  //     {title : req.body.title, content : req.body.content}, 
  //     function(err, result){
  //         console.log(err);
  //         console.log(result);
  //         console.log('데이터 추가 성공');
  //     });  

  mydb.collection('post').insertOne(
    {title : req.body.title, content : req.body.content, date : req.body.someDate})
    .then(result => {
        console.log(result);
        console.log('데이터 추가 성공');
    });

  // let sql = "insert into post (title, content, created) values(?, ?, NOW())";
  // let params = [req.body.title, req.body.content];
  // conn.query(sql, params, function (err, result) {
  //     if (err) throw err;
  //     console.log('데이터 추가 성공'); 
  // });
  res.render('데이터 추가 성공');
});

app.post("/delete", function (req, res) {
  console.log(req.body);
  req.body._id = new ObjId(req.body._id);
  mydb.collection('post').deleteOne(req.body)
  .then(result=>{
    console.log('삭제완료');
    res.status(200).send();
  })
  .catch(err =>{
    console.log(err);
    res.status(500).send();
  });
});

// app.get('/content/:_id', (req, res) => {
//   console.log(req.params._id);
//   mydb.collection('post')
//     .findOne({_id: new ObjId(req.params._id)})
//     .then(result => {
//       res.render('content.ejs',{data:result});
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send();
//     });
  
// });

// app.post('/edit', function(req, res){
//   console.log(req.body);
//   // 클라이언트 사이드렌더링(CSR) 방식으로 수정페이지로 이동
//   res.render('edit.ejs', {data : req.body}); // 수정할 데이터를 edit.ejs로 전달
// });

app.post('/update', function(req, res){
  console.log(req.body);
  mydb.collection('post')
  .updateOne(
    //수정할 데이터의 조건
    {_id : new ObjId(req.body._id)},
    //수정할 내용
    {$set : {title : req.body.title, content : req.body.content, date : req.body.someDate}}
  )
  .then(result => {
    // res.redirect('/list');
    list(req, res);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send();
  });
  
});


// ===================== cookie test =====================
const cookieParser = require('cookie-parser');
app.use(cookieParser('암호화키'));
app.get("/cookie", (req, res) => {

  // let milk = parseInt(req.cookies.milk) + 1000;

  // signedCookies : 암호화된 쿠키값을 복호화하여 가져옴
  let milk = parseInt(req.signedCookies.milk) + 1000;

  if(isNaN(milk)){
    milk = 0;
  }
  // maxAge : 1000ms = 1s (쿠키 유효시간 1초)
  // res.cookie('milk', milk, {maxAge: 1000});
  res.cookie('milk', milk, {signed:true});
  res.cookie('name', 'dawon', {signed:true});
  // res.send('내가 만든 쿠키. 너를 위해 구웠지,'); 
  res.send('product : ' + req.cookies.milk + ' name: ' + req.cookies.name); 
});

// ===================== session test =====================

let session = require('express-session');

/*
  [ resave ]  
    - 세션을 언제나 저장할지 정하는 값 (=> 세션 식별자(sid)발급 여부 결정)
    - 일반적으로 false로 설정
    - true로 설정하면 세션이 변경되지 않아도 무조건 저장함
    - false로 설정하면 세션이 변경되었을 때만 저장함

[ saveUninitialized ]
    - 세션이 저장되기 전에 uninitialized 상태로 미리 만들어 저장
    - 일반적으로 true로 설정

   */ 

app.use(session({
  secret : '암호화키',
  resave : false, 
  saveUninitialized : true
}));

// app.get('/session', (req, res) => {

//   if(isNaN(req.session.milk)){
//     req.session.milk = 0;
//   }

//   // 세션에 데이터 저장
//   req.session.milk = 1000;
//   res.send('session : ' + req.session.milk + '원');
// });

// ===================== 로그인 =====================
app.get("/login", (req, res) => {
  console.log("로그인 페이지로 이동");
  res.render('login.ejs');
});

app.post("/login", (req, res) => {

  console.log(req.session);
  if(req.session.user) {
    console.log('세션 유지. 이미 로그인 되어있습니다.');
    res.send('세션 유지. 이미 로그인 되어있습니다.');
  } else {
    console.log('세션 없음. 로그인 페이지로 이동');
    res.render('login.ejs');
  }
  
  mydb
  .collection("account")
  .findOne({ userid: req.body.userid}) // userid: => DB에 있는 필드명
  .then((result) => {
    if(result.userpw == req.body.userpw){

        req.session.user = req.body;
        console.log('새로운 로그인.');

        res.send('로그인 되었습니다.');
    } else {
        res.send('비밀번호가 틀렸습니다.');
    }
  });
});





// 회원가입
// app.get("/join", (req, res) => {
//   res.render('join.ejs');
// });

// app.post("/join", (req, res) => {
//   console.log(req.body);
//   mydb.collection('account').insertOne(req.body)
//   .then(result => {
//     console.log('회원가입 성공');
//     res.redirect('/login');
//   })
//   .catch(err => {
//     console.log(err);
//     res.send('회원가입 실패');
//   });
// });
