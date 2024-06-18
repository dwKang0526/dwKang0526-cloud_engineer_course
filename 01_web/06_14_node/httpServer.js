const express = require("express");
const app = express();

app.listen(8080, function(){
    console.log('Server is running on 8080');
});

app.get("/book", function(req, res){
    res.send("책");
});

app.get("/", function(req, res){
    // res.send("홈입니다.");
    res.sendFile(__dirname + "/index.html")
});