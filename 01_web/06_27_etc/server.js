const mongoclient = require("mongodb").MongoClient;
const ObjId = require("mongodb").ObjectId;
const url = `mongodb+srv://admin:1234@cluster0.tqngyat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let mydb;
let mysqlconn;
mongoclient
  .connect(url)
  .then((client) => {
    mydb = client.db("myboard");
   
    const mysql = require("mysql");
    mysqlconn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root1234",
      database: "myboard",
    });

    mysqlconn.connect();
    console.log("mysqlconn ok ");
    
    console.log("mongodb ok ");
    app.listen(8080, function () {
      console.log("포트 8080으로 서버 대기중 ... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const app = express();

app.use(express.static("public")); //static 미들웨어 설정

//body-parser 라이브러리 추가
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// post 방식의 요청을 처리할 라우터 모듈 설정
app.use('/', require('./routes/post.js'));


app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
});



//'/enter' 요청에 대한 처리 루틴
app.get("/enter", function (req, res) {
  // res.sendFile(__dirname + '/enter.html');
  res.render("enter.ejs");
});





app.get("/list", function (req, res) {
  //   conn.query("select * from post", function (err, rows, fields) {
  //     if (err) throw err;
  //     console.log(rows);
  //   });
  list(req, res);
});

function list(req, res) {
  mydb
    .collection("post")
    .find()
    .toArray()
    .then((result) => {
      //console.log(result);
      res.render("list.ejs", { data: result });
    });
}

// =================== session test ===================
const session = require("express-session");
app.use(
  session({
    secret: "암호화키",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/login", (req, res) => {
  if (req.session.user) {
    //res.send('이미 로그인 되어있습니다');
    res.render("/index.ejs", { user: req.session.user });
  } else {
    res.render("login.ejs");
  }
});


app.get("/bank", (req, res) => {
  if (typeof req.session.user != "undefined") {
    res.send(`${req.session.user.userid}님 자산 현황`);
  } else {
    res.send("로그인부터 해주세요");
  }
});

app.get("/logout", (req, res) => {
  console.log("로그아웃");
  req.session.destroy();
  res.render("index.ejs", { user: null });
});

app.get("/", function (req, res) {
  if (req.session.user) {
    //res.send('이미 로그인 되어있습니다');
    res.render("index.ejs", { user: req.session.user });
  } else {
    res.render("index.ejs", { user: null });
  }
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs');
})

// ============ 회원 가입 처리 ============
const sha = require('sha256');
app.post('/signup', (req, res) => {
  console.log(req.body);

  // crypto 모듈
  const crypto = require('crypto');
  // const generateSalt = function() {};
  // 인자 length의 default 값이 16인 함수
  const generateSalt = (length=16) => {
    return crypto.randomBytes(length).toString("hex");
  };

  const salt = generateSalt();
  console.log(`Generated salt : ${salt}`);

  console.log('salt 없는 PW hash : ', sha(req.body.userpw));
  // salt를 이용한 암호화
  req.body.userpw = sha(req.body.userpw + salt);
  console.log('salt 있는 PW hash : ', req.body.userpw);

  mydb.collection('account')
    .insertOne(req.body)
    .then(result => {
      console.log('회원가입 성공');

      // MySQL에 salt 저장
      const sql = `INSERT INTO UserSalt (userid, salt)
                    VALUES (?, ?)`;
      mysqlconn.query(sql, [req.body.userid, salt], (err, result2)=>{
        if(err) {
          console.log(err);
        } else {
          console.log('salt 저장 성공');
        }
      });
    })
    .catch(err => {
      console.log(err);
    });

  res.redirect('/');
});

// 사용자마다 랜덤하게 만들어진 salt 를 DB에 저장하여 pw를 암호화
