const dotenv = require('dotenv').config(); // dotenv 모듈을 가져옴
const { MongoClient } = require('mongodb'); // mongodb 모듈에서 {MongoClient} 객체를 가져옴 ({}는 객체를 가져오는 것)
const mysql = require('mysql2'); // mysql 모듈을 가져옴

let mongodb;
let mysqldb;

// MongoDB 연결 (async, await 사용해서 비동기 처리)
const setup = async () => {

    // ********* 이미 연결되어 있으면 함수 종료 *********
    if(mongodb && mysqldb) { 
        return { mongodb, mysqldb };
    }

    try {
        // .env 파일에 저장된 MONGODB_URL을 가져옴
        const mongoDbUrl = process.env.MONGODB_URL;
        // connect(url, 설정option)
        const mongoConn = await MongoClient.connect(
            mongoDbUrl, 
            {
                useNewUrlParser: true,  
                useUnifiedTopology: true 
            }
        ); 
        mongodb = mongoConn.db(process.env.MONGODB_DB); // myboard 데이터베이스에 연결
        console.log('MongoDB 접속 성공');

        // MySQL 연결 (awit 안해도 됨 => 비동기 처리 필요 없음, 왜? => 동기 처리로 진행 가능하기 때문)
        mysqldb = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        mysqldb.connect(); // 연결
        console.log('MySQL 접속 성공');

        return { mongodb, mysqldb };

    } catch (error) {
        console.error('DB 접속 에러: ', error);
        throw error; // 에러 발생 시 에러를 던짐
    }
    
};

// ********* setup 함수를 외부에서 사용할 수 있도록 export 함 *********
module.exports = setup; 
// ************************************************************
