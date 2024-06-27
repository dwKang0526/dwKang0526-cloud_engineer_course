// 강사님 코드 + 내 mogoDB 연결 + 내 개인키

const fs = require("fs");
const https = require("https");

const express = require("express");
const app = express();

// SSL 인증서와 키 파일 읽기
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const mongoclient = require("mongodb").MongoClient;
const url = `mongodb+srv://admin:1234@cluster0.tqngyat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let mydb;
mongoclient
  .connect(url)
  .then((client) => {
    console.log("몽고DB 접속 성공");
    mydb = client.db("myboard");

    // app.listen(8080, function () {
    //   console.log("8080 server ready...");
    // });

    // HTTPS 서버 생성
    https.createServer(options, app).listen(443, () => {
      console.log("HTTPS Server running on port 443");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//////// passport 등록
const passport = require("passport");

const session = require("express-session");
app.use(
  session({
    secret: "암호화키",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());



////// facebook 인증
const FacebookStrategy = require("passport-facebook");

app.get("/facebook", passport.authenticate("facebook"));

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    //failureRedirect: "/fail",
  }),
  (req, res) => {}
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "1286933006058045",
      clientSecret: "20b05d112b77c5480adcab5be373b8bf",
      callbackURL: "/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("2", profile);
      var authkey = "facebook" + profile.id;
      var authName = profile.displayName;

      mydb
        .collection("account")
        .findOne({ userkey: authkey })
        .then((result) => {
          console.log("3", result);
          if (result != null) {
            console.log("3-1 페이스북 사용자를 우리 DB에서 찾았음");
            done(null, result);
          } else {
            console.log("3-1 페이스북 사용자를 우리 DB에서 못찾았음");
            mydb
              .collection("account")
              .insertOne({
                userkey: authkey,
                userid: authName,
              })
              .then((insertResult) => {
                if (insertResult != null) {
                  console.log("3-2 페이스북 사용자를 우리 DB에 저장 완료");
                  mydb
                    .collection("account")
                    .findOne({ userkey: authkey })
                    .then((result2) => {
                      if (result2 != null) {
                        console.log("3-3 페이스북 사용자를 우리 DB에 저장 후 다시 찾았음");
                        done(null, result2);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          //done(null, false, err);
        });    
    }
  )
);

passport.serializeUser(function (user, done) {
  try {
    console.log("4 serializeUser");   
    done(null, user);
  } catch (err) {
    console.log(err);
  }
});

passport.deserializeUser(function (user, done) {
  console.log("5.deserializeUser");

  mydb
    .collection("account")
    .findOne({ userkey: user.userkey })
    .then((result) => {
      console.log(result);
      done(null, result);
    }); //user는 이미 passport에 있는 객체라서 이렇게 매번 DB에 가서 확인할 필요가 전혀없다!
});


app.get("/", (req, res) => {
  console.log("/ 요청");
  try {
    console.log("1", req.session.passport);
    if (typeof req.session.passport != undefined && req.session.passport.user) {
      res.render("index.ejs", { data: req.session.passport });
    } else {
      res.render("index.ejs", { data: null });
    }
  } catch (err) {
    console.log('1-1');
    res.render("index.ejs", { data: null });
  }
});

///////// login
app.get("/login", (req, res) => {
  console.log("/login", req.session.passport);
  res.render("login.ejs");
});
