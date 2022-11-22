const { Pool } = require("pg");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
var cors = require("cors");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "Review",
  password: "123",
  port: 5432,
};
const pool = new Pool(credentials);
//Connect with a connection pool

// exports.getTemp(()=>{

// })

const getReviewData = async () => {
  const sSql = `select * from review.mreview;`;
  const res = await pool.query(sSql);
  return res.rows;
};

const insertReview = async (data) => {
  const {sTitle, sContent}=data
  const sSql = `insert into review.mreview(title, content, datetime) values('${sTitle}', '${sContent}', now())`;
  const res = pool.query(sSql);
};

const editReview = async (data) => {
  const {sTitle, sContent, iReviewID}=data
  const sSql = `update review.mreview set title='${sTitle}', content='${sContent}' where reviewid=${iReviewID}`;
  const res = pool.query(sSql);
};

const deleteReview = async (data) => {
  const {iReviewID}=data
  const sSql = `delete from review.mreview where reviewid=${iReviewID}`;
  const res = pool.query(sSql);
};

app.get("/getreview", async (req, res) => {
  const reviewData = await getReviewData();
  console.log("reviewData : ", reviewData);
  res.send(reviewData);
});

app.get("/insertReview", async (req, res) => {
  const data = req.body;
  const reviewData = insertReview();
  res.send(reviewData);
});

app.get("/editReview", async (req, res) => {
  const data = req.body;
  const reviewData = editReview();
  res.send(reviewData);
});

app.post("/deleteReview:id", async (req, res) => {
  const { id } = req.params;
  const reviewData = deleteReview();
  res.send(200).json(reviewData);
});
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log("Successfully running on 4000");
});
