const router = require("express").Router();
const setup = require("../db_setup");
const sha = require("sha256");
const { ObjectId } = require("mongodb");

////로그인 된 사용자만 게시물 삭제해주기. 이때 자기글에 대해서만 삭제 가능하도록 해야함.
router.post("/post/delete", async (req, res) => {
  //console.log(req.body, "\n===============");
  if (req.session.user) {
    // 로그인 된 사용자라면
    const { mongodb } = await setup();
    mongodb
      .collection("post")
      .findOne({ _id: new ObjectId(req.body._id) }) //자기글인지 확인
      .then((result) => {
        //console.log(result, "\n", req.session);
        if (result && result.id == req.session.user.userid) {
          mongodb
            .collection("post")
            .deleteOne({ _id: new ObjectId(req.body._id) })
            .then((result) => {
              console.log("글 삭제 완료");
              list(mongodb, req, res);
            })
            .catch((err) => {
              res.render("index.ejs", { data: { alertMsg: "서버오류: 잠시 뒤 다시 시도 해주세요" } });
            });
        } else {
          res.render("index.ejs", { data: { alertMsg: "글이 없거나 글쓴이가 일치하지 않습니다 " } });
        }
      })
      .catch((err) => {
        console.log(err);
        res.render("index.ejs", { data: { alertMsg: "서버오류: 잠시 뒤 다시 시도 해주세요" } });
      });
  } else {
    res.render("index.ejs", { data: { alertMsg: "로그인 먼저 해주세요" } });
  }
});

////로그인 된 사용자만 게시물 수정해주기. 이때 자기글에 대해서만 수정 가능하도록 해야함.
router.post("/post/update", async (req, res) => {
  //console.log(req.body, "\n===============");
  if (req.session.user) {
    // 로그인 된 사용자라면
    const { mongodb } = await setup();
    mongodb
      .collection("post")
      .findOne({ _id: new ObjectId(req.body._id) }) //자기글인지 확인
      .then((result) => {
        //console.log(result, "\n", req.session);
        if (result && result.id == req.session.user.userid) {
          mongodb
            .collection("post")
            .updateOne({ _id: new ObjectId(req.body._id) }, { $set: { title: req.body.title, content: req.body.content, date: req.body.someDate } })
            .then((result) => {
              console.log("글 수정 완료");
              list(mongodb, req, res);
            })
            .catch((err) => {
              res.render("index.ejs", { data: { alertMsg: "서버오류: 잠시 뒤 다시 시도 해주세요" } });
            });
        } else {
          res.render("index.ejs", { data: { alertMsg: "글이 없거나 글수정자가 일치하지 않습니다 " } });
        }
      })
      .catch((err) => {
        console.log(err);
        res.render("index.ejs", { data: { alertMsg: "서버오류: 잠시 뒤 다시 시도 해주세요" } });
      });
  } else {
    res.render("index.ejs", { data: { alertMsg: "로그인 먼저 해주세요" } });
  }
});

//글쓰기 처리
router.post("/post/save", async (req, res) => {
  //console.log(req.body);
  if (req.session.user) {
    if (req.session.user.userid == req.body.id) {
      const { mongodb } = await setup();
      mongodb
        .collection("post")
        .insertOne({ id: req.body.id, title: req.body.title, content: req.body.content, date: new Date() })
        .then((result) => {
          //console.log(result);
          console.log("데이터 추가 성공");
          list(mongodb, req, res);
        });
    } else {
      console.log("글쓰기 해킹 시도 발생...");
      res.render("index.ejs", { data: { alertMsg: "로그인 사용자와 글작성자가 일치하지 않습니다 " } });
    }
  } else {
    res.render("index.ejs", { data: { alertMsg: "로그인 먼저 해주세요" } });
  }
});

//로그인 된 사용자만 글쓰기 화면 보여주기
router.get("/post/enter", function (req, res) {
  if (req.session.user) {
    res.render("post/enter.ejs", { data: { id: req.session.user.userid } });
  } else {
    res.render("index.ejs", { data: { alertMsg: "로그인 먼저 해주세요" } });
  }
});

//로그인 된 사용자만 게시물 목록을 보여주기
router.get("/post/list", async (req, res) => {
  if (req.session.user) {
    const { mongodb } = await setup();
    list(mongodb, req, res);
  } else {
    res.render("index.ejs", { data: { alertMsg: "로그인 먼저 해주세요" } });
  }
});

function list(mongodb, req, res) {
  let page = parseInt(req.query.page ? req.query.page : 1);
  console.log(page);
  const limit = 3;
  const skip = (page - 1) * limit;

  // 게시물 총 개수 조회
  mongodb
    .collection("post")
    .countDocuments({})
    .then((totalPosts) => {
      // 총 페이지 수 계산
      const totalPages = Math.ceil(totalPosts / limit);

      // 현재 페이지의 게시물 목록 조회
      mongodb
        .collection("post")
        .find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .toArray()
        .then((result) => {
          console.log('result: ',result);
          res.render("post/list.ejs", { data: result, currentPage: page, totalPages });
        });
    });
}

module.exports = router;
