var router = require('express').Router();


//'/save' 요청에 대한 post 방식의 처리 루틴
router.post("/save", function (req, res) {

  mydb
    .collection("post")
    .insertOne({ title: req.body.title, content: req.body.content, date: req.body.someDate })
    .then((result) => {
      //console.log(result);
      console.log("데이터 추가 성공");
      list(req, res);
    });
});

router.post("/update", (req, res) => {
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

router.post("/delete", function (req, res) {
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

router.post("/login", (req, res) => {
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


module.exports = router;