const router = require("express").Router();
const setup = require('../db_setup');
const sha = require('sha256');


router.get("/login", (req, res) => {
  if (req.session.user) {
    console.log("이미 로그인 되어 있습니다.");
    res.render("index.ejs", { user: req.session.user });
  } else {
    console.log("로그인 페이지로 이동합니다.");
    res.render("login.ejs");
  }
});

router.post("/login", async (req, res) => {
    const { mysqldb } = await setup();
    const { userid, userpw } = req.body;
    const sql = 'SELECT * FROM Users WHERE user_id = ? AND password = ?';

    mysqldb.query(sql, [userid, sha(userpw)], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            req.session.user = rows[0];
            res.render("index.ejs", { user: req.session.user });
        } else {
            res.render("login.ejs");
        }
    });
});

router.get("/logout", (req, res) => {
  console.log("로그아웃");
  req.session.destroy();
  res.render("index.ejs", { user: null });
});

router.get("/", function (req, res) {
  if (req.session.user) {
    res.render("index.ejs", { user: req.session.user });
  } else {
    res.render("index.ejs", { user: null });
  }
});

router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

router.post('/signup', async (req, res) => {
  const newUser = { 
    user_id: req.body.userid, 
    password: sha(req.body.userpw), 
    name: req.body.username,
    id_number: req.body.ssn,
    phone: req.body.phone,
    email: req.body.useremail,
    address: req.body.address
  };
  const { mysqldb } = await setup();
  const sql = 'INSERT INTO Users SET ?';
  mysqldb.query(sql, newUser, (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});


// 외부에서 사용할 수 있도록 router를 export
module.exports = router; 

