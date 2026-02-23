const path = require("path"); //for task 8 Week7 Day 2

const express = require("express");

const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/articles.controller");
const { getArticleById } = require("./controllers/articles.controller");
const app = express();

app.use(express.static(path.join(__dirname, "public"))); // for task 8 Week7 Day 2

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);

const { getCommentsByArticleId } = require("./controllers/comments.controller");
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api", (req, res) => {
  res.status(200).send({
    endpoints: {
      "GET /api/topics": "Get all topics",
      "GET /api/articles": "Get all articles",
    },
  });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
