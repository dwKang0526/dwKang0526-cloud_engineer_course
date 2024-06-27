// db_setup.js 파일을 가져옴
const setup = require('./db_setup'); // return 된 객체가 아닌 db_setup.js에서 module.exports = setup; 한 setup 함수를 가져옴
const express = require('express'); // express 모듈을 가져옴

const app = express(); // express 객체를 app 변수에 저장

const session = require('express-session'); 
app.use(session({
    secret: 'my_secret_key', // 세션 암호화 키
    resave: false, // 세션을 항상 저장할지 여부
    saveUninitialized: false // 초기화되지 않은 세션을 저장할지 여부
})); 

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// bodyParser를 사용하도록 설정
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // extended: true => 중첩된 객체 표현 허용

app.get('/', (req, res) => {
    res.render('index.ejs');
});

// context path가 /account인 account.js 파일을 가져옴 (route명 / 이거 아님)
// /account로 시작하는 url은 account.js 파일로 이동
app.use('/', require('./routes/account'));
app.use('/', require('./routes/post.js'));

app.listen(process.env.WEB_PORT, async () => {
    await setup(); // setup 함수를 실행
    console.log("8080 서버가 준비되었습니다.");
});


