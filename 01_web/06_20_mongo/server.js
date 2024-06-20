const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// extended : 중첩된 객체표현을 허용할지 말지를 정하는 것이다. 
// true면 중첩된 객체표현을 허용한다.
app.use(bodyParser.urlencoded({extended: true})); // post 방식으로 넘어온 데이터를 해석해줌

// app.set('views', path.join(__dirname, '폴더명'));
// ejs를 사용하기 위한 설정
app.set('view engine', 'ejs');

// Mongodb의 클라이언트 객체를 생성하는 코드
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = `mongodb+srv://admin:1234@cluster0.tqngyat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// 나중에도 꺼내 쓰려고 전역변수로 선언
let mydb;
mongoClient
    .connect(url)
    .then(client => {
        console.log('MongoDB 접속 성공.');
        mydb = client.db('myboard');
        mydb
            .collection('post')
            .find()
            .toArray()
            .then(result => {
                    console.log(result);
        });
        app.listen(8080, function() {
            console.log('8080 server is ready');
        });   
    })
    .catch(err => {
        console.log(err);
    });

app.get('/list', function(req, res) {
    mydb
        .collection('post')
        .find()
        .toArray()
        .then(result => {
            console.log(result);
            // 동적으로 <tr> 태그를 만드려고 하는데 아래와 같이 Html file 을 보내면 절대 동적으로 만들 수 없다.
            // res.send(result)
            // res.sendFile(__dirname + '/list.html');
            // 동적
            res.render('list.ejs', {data:result});
    });
});

// [라우팅]
app.get("/enter", function(req, res) {
    // __dirname : 현재 실행중인 파일의 경로
    // res.sendFile(__dirname + '/enter.html');
    res.render('enter.ejs');
});


app.post('/save', (req, res) => {
    // console.log("someDate : "+req.body.someDate);
    mydb
        .collection('post')
        .insertOne({
            title: req.body.title,
            content: req.body.content,
            date: req.body.someDate,
            // date: new Date(req.body.someDate),
    }).then(result => {
        // 나중에 콜백함수로 처리
        console.log('저장 완료', result);
        res.send("데이터 추가 성공");
    });

    // 위에서 콜백함수로 처리하기 때문에 여기서 처리하면 안됨
    // res.send('저장완료');
});


app.post('/delete', (req, res) => {
    req.body._id = new ObjectId(req.body._id);
    
    mydb.collection('post').deleteOne(req.body)
        // delete한 결과
        .then(result => {
            if (result.deletedCount > 0) {
                console.log('삭제 완료'); 
                res.status(200).send('삭제 완료');
            } else {
                console.log('삭제할 항목이 없습니다.'); 
                res.status(404).send('삭제할 항목이 없습니다.');
            }
        })
        .catch(err => {
            console.error(err); 
            res.status(500).send('서버 에러');
        });
});


app.get('/content/:_id', (req, res) => {
    mydb.collection('post')
    .findOne({ _id: new ObjectId(req.params._id) })
    .then(result => {
        if (result) {
            res.render('content.ejs', { data: result }); // data라는 이름으로 result를 넘겨줌
        } else {
            res.status(404).send('해당 게시물을 찾을 수 없습니다.');
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('서버 에러');
    });
});


app.get('/edit/:_id', (req, res) => {
    mydb.collection('post')
        .findOne({ _id: new ObjectId(req.params._id) })
        .then(result => {
            if (result) {
                res.render('edit.ejs', { data: result }); // data라는 이름으로 result를 넘겨줌
            } else {
                res.status(404).send('해당 게시물을 찾을 수 없습니다.');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('서버 에러');
        });
});


app.post('/edit', (req, res) => {
    // console.log(req.body);
    
    // 업데이트할 데이터 정의
    const updateData = {
        title: req.body.title, 
        content: req.body.content, 
        date: req.body.someDate
    };

    mydb.collection('post')
        .updateOne(
            {_id: new ObjectId(req.body._id)}, // 조건
            { $set: updateData} // 변경 데이터
        ) 
        .then(result => {
            console.log('수정 완료');
            res.redirect('/list'); // 수정이 완료되면 list로 이동
            // res.render("list.ejs", { data: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('서버 에러');
        });
});

// express 위치가 DB 설정 위? 아래?
// 1. express가 위 : 
// 2. express가 아래 : 