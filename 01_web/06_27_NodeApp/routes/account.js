const router = require("express").Router();
const setup = require('../db_setup');

const sha = require('sha256');

// 회원가입 화면 보기
router.get('/account/enter', (req, res) => {
    res.render('enter.ejs');
});

// 회원가입 처리
router.post('/account/save', async (req, res) => {
    
    // setup이 비동기 함수이기 때문에 async, await 사용해서 기다리게 함
    const { mongodb, mysqldb } = await setup();
    mongodb.collection('account')
        .findOne({userid: req.body.userid})
        .then( result => {
            // result에는 null 이 있을 수 있으니까 무조건! NPE 대응을 해줘야함
            if(result) {
                res.render('enter.ejs', {data: {msg: 'ID가 중복되었습니다.'}});
            } else {
                // [salt 생성]
                const generateSalt = (length = 16) => { 
                    // crypto 모듈을 가져옴
                    const crypto = require('crypto'); // 
                    // randomBytes 함수를 사용해서 length 길이의 랜덤한 salt를 생성
                    return crypto.randomBytes(length).toString('hex'); 
                };

                const salt = generateSalt();
                console.log('salt: ', salt);
                // sha256 암호화
                req.body.userpw = sha(req.body.userpw + salt);
                mongodb.collection('account')
                    .insertOne(req.body)
                    .then(result => {
                        if(result) {
                            console.log('회원가입 성공');
                            const sql = `insert into usersalt (userid, salt) values (?, ?)`;
                            // query() : 3번째 인자는 콜백함수
                            mysqldb.query(sql, [req.body.userid, salt], (err, rows, fields)=>{
                                if(err) {
                                    console.log(err);
                                } else {
                                    console.log('salt 저장 성공');
                                }
                            }); 
                            res.redirect('/');
                        } else {
                            console.log('회원가입 실패');
                            // res.render('enter.ejs', {data: {msg: '회원가입 실패'}});
                            res.render('enter.ejs', {data: {alertMsg: '회원가입 실패'}});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send();
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send();
        });

});


// 로그인 처리
router.post('/account/login', async (req, res) => {
    console.log(req.body);

    const { mongodb, mysqldb } = await setup();
    mongodb.collection('account')
        .findOne({userid: req.body.userid})
        .then(result => {
            if (result) {
                const sql =  `SELECT * FROM usersalt WHERE userid = ?`;
                mysqldb.query(sql, [req.body.userid], (err, rows, fields) => {
                    // 0번 없으면? 
                    const salt = rows[0].salt;
                    const hashPW = sha(req.body.userpw + salt);
                    if(result.userpw === hashPW) {
                        // login ok
                        req.body.userpw = hashPW; // 보안을 위해 비밀번호를 암호화된 비밀번호로 변경
                        req.session.user = req.body // serialize
                        res.cookie('uid', req.body.userid);
                        res.render('index.ejs');
                    } else {
                        // pw fail
                        res.render('index.ejs', {data: {alertMsg: '다시 로그인 해주세요.'}});
                    }
                });
            } else {
                // login fail
                res.render('index.ejs', {data: {alertMsg: '다시 로그인 해주세요.'}});
            }
        })
        .catch(err => {
            // login fail
            res.render('index.ejs', {data: {alertMsg: '다시 로그인 해주세요.'}});
        });

    // res.render('index.ejs', {data: {alertMsg: '다시 로그인 해주세요.'}});
});

router.get('/account/logout', (req, res) => {
    req.session.destroy();
    res.render('index.ejs');
});

// 외부에서 사용할 수 있도록 router를 export 함
module.exports = router; 

