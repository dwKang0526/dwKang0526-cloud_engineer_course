// mongodb 연결
const mongoclient = require("mongodb").MongoClient;
const ObjId = require("mongodb").ObjectId;
const url = `mongodb+srv://admin:1234@cluster0.tqngyat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let mydb;
mongoclient
  .connect(url)
  .then((client) => {
    mydb = client.db("myboard");
    console.log("mongodb ok ");
    app.listen(8080, function () {
      console.log("포트 8080으로 서버 대기중 ... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

  // express 라이브러리 추가
const express = require("express");
const app = express();

// static 미들웨어 설정
app.use(express.static("public")); 

// body-parser 라이브러리 추가
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// ejs 라이브러리 추가
app.set('view engine', 'ejs');

// cookie 미들웨어 설정
const cookieParser = require("cookie-parser");
app.use(cookieParser("암호화키"));

// session 미들웨어 설정
const session = require("express-session");
app.use(
  session({
    secret: "암호화키",
    resave: false,
    saveUninitialized: false, // *** true로 설정하면 세션이 필요없는 경우에도 세션이 생성됨
  })
);

// common
function list(req, res) {
  mydb
    .collection("post")
    .find()
    .toArray()
    .then((result) => {
      //console.log(result);
      res.render("list", { data: result });
    });
}

// ROUTER
app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
});

app.get("/list", function (req, res) {
  list(req, res);
});


// 게시물 작성
app.get("/enter", function (req, res) {
  // res.sendFile(__dirname + '/enter.html');
  res.render("enter");
});

// 게시물 저장
app.post("/save", function (req, res) {
  //console.log(req.body.title);
  // console.log(req.body.content);

  mydb
    .collection("post")
    .insertOne(
      { 
        title: req.body.title, 
        content: req.body.content, 
        date: req.body.someDate 
      }
    )
    .then((result) => {
      console.log("데이터 추가 성공");
      list(req, res);
    });
});

// 삭제
app.post("/delete", function (req, res) {
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

// =============== cookie test ===============
// app.get("/cookie", (req, res) => {
//   let milk = parseInt(req.signedCookies.milk) + 1000;
//   if (isNaN(milk)) {
//     milk = 0;
//   }
//   res.cookie("milk", milk, { signed: true });
//   res.cookie("name", "전은수", { signed: true });
//   res.send("product:" + req.signedCookies.milk + ": " + "name:" + req.signedCookies.name);
// });

// =============== session test ===============
// app.get("/session", (req, res) => {
//   if (isNaN(req.session.milk)) {
//     req.session.milk = 0;
//   }
//   req.session.milk += 1000;
//   res.send(`session: ${req.session.milk}원`);
// });


app.get("/login", (req, res) => {
  if (req.session.user) {
    // res.send('이미 로그인 되어있습니다');
    res.render("index", { user: req.session.user });
  } else {
    res.render("login");
  }
});


app.post("/login", (req, res) => {
  mydb
    .collection("account")
    .findOne({ userid: req.body.userid })
    .then((result) => {
      if (result != null && result.userpw == req.body.userpw) {
        req.session.user = req.body;
        console.log("새로운 로그인");
        // res.send(`${req.session.user.userid}님 환영합니다`);
        res.render("index", { user: req.session.user });
      } else {
        res.render("login");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});


app.get("/logout", (req, res) => {
  console.log("로그아웃");
  req.session.destroy();
  res.render("index", { user: null });
});


app.get("/bank", (req, res) => {
  if (typeof req.session.user != "undefined") {
    res.send(`${req.session.user.userid}님 자산 현황`);
  } else {
    res.send("로그인부터 해주세요");
  }
});


app.get("/", function (req, res) {
  if (req.session.user) {
    //res.send('이미 로그인 되어있습니다');
    res.render("index", { user: req.session.user });
  } else {
    res.render("index", { user: null });
  }
});


app.get('/signup', (req, res) => {
  console.log()
  res.render('signup');
}); 


app.post('/signup', (req, res) => {
  console.log(req.body);
  console.log(sha(req.body.userpw));

  mydb.collection('account')
    .insertOne(req.body)
    .then(result => {
      console.log("회원가입 성공");
    })
    .catch(err => {
      console.log(err);
    });

    res.redirect('/');
});


app.get('/logout', (req, rew) => {
  console.log();
  req.session.destroy();
  res.redirect("/");
});