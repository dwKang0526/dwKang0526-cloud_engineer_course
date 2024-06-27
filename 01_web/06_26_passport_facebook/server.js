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

app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
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

//'/enter' 요청에 대한 처리 루틴
app.get("/enter", function (req, res) {
  // res.sendFile(__dirname + '/enter.html');
  res.render("enter.ejs");
});

//'/save' 요청에 대한 post 방식의 처리 루틴
app.post("/save", function (req, res) {
  //console.log(req.body.title);
  // console.log(req.body.content);

  mydb
    .collection("post")
    .insertOne({ title: req.body.title, content: req.body.content, date: req.body.someDate })
    .then((result) => {
      //console.log(result);
      console.log("데이터 추가 성공");
      list(req, res);
    });
});

app.post("/delete", function (req, res) {
  //console.log(req.body);
  req.body._id = new ObjId(req.body._id);
  mydb
    .collection("post")
    .deleteOne(req.body)
    .then((result) => {
      console.log("삭제완료");
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

// app.get('/content/:_id', (req, res) => {
//   //console.log(req.params._id);
//   mydb.collection('post')
//     .findOne({_id:new ObjId(req.params._id)})
//     .then(result => {
//       res.render('content.ejs',{data:result});
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send();
//     });

// });

// app.post('/edit', (req, res) => {
//   console.log(req.body);
//   res.render('edit.ejs', {data:req.body})
// });

app.post("/update", (req, res) => {
  console.log(req.body);
  mydb
    .collection("post")
    .updateOne({ _id: new ObjId(req.body._id) }, { $set: { title: req.body.title, content: req.body.content, date: req.body.someDate } })
    .then((result) => {
      //res.redirect('/list');
      list(req, res);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

//////////// cookie test
// const cookieParser = require("cookie-parser");
// app.use(cookieParser("암호화키"));
// app.get("/cookie", (req, res) => {
//   let milk = parseInt(req.signedCookies.milk) + 1000;
//   if (isNaN(milk)) {
//     milk = 0;
//   }
//   res.cookie("milk", milk, { signed: true });
//   res.cookie("name", "전은수", { signed: true });
//   res.send("product:" + req.signedCookies.milk + ": " + "name:" + req.signedCookies.name);
// });

///////////// session test
const session = require("express-session");
app.use(
  session({
    secret: "암호화키",
    resave: false,
    saveUninitialized: false,
  })
);

// app.get("/session", (req, res) => {
//   if (isNaN(req.session.milk)) {
//     req.session.milk = 0;
//   }
//   req.session.milk += 1000;
//   res.send(`session: ${req.session.milk}원`);
// });

app.get("/login", (req, res) => {
  if (req.session.user) {
    //res.send('이미 로그인 되어있습니다');
    res.render("/index.ejs", { user: req.session.user });
  } else {
    res.render("login.ejs");
  }
});

app.post("/login", (req, res) => {
  //console.log(req.body);
  mydb
    .collection("account")
    .findOne({ userid: req.body.userid })
    .then((result) => {
      //console.log(result);
      // todo result 가 있을 때 salt 가져오도록

      let salt;
      const sql = `SELECT salt 
                  FROM UserSalt
                  WHERE userid = ?`;

      // callback function의 첫번째 함수는 에러, 두번째는 결과
      mysqlconn.query(sql, [req.body.userid], (err, rows, fields)=>{
        console.log(rows);
        salt = rows[0].salt;

        const hashPW = sha(req.body.userpw + salt);
        if (result != null && result.userpw == hashPW) {
          req.body.userpw = hashPW;
          req.session.user = req.body;
          console.log("새로운 로그인");
          // res.send(`${req.session.user.userid}님 환영합니다`);
          res.render("index.ejs", { user: req.session.user });
        } else {
          //res.send("login fail");
          res.render("login.ejs");
        }
        
      }); 
      
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
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
