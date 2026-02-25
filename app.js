const cors = require("cors");

const path = require("path");

const express = require("express");

const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/articles.controller");
const { getArticleById } = require("./controllers/articles.controller");
const { patchArticleVotes } = require("./controllers/articles.controller");
const { getCommentsByArticleId } = require("./controllers/comments.controller");
const { postComment } = require("./controllers/comments.controller");
const { deleteComment } = require("./controllers/comments.controller");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.patch("/api/articles/:article_id", express.json(), patchArticleVotes);

app.post("/api/articles/:article_id/comments", express.json(), postComment);

app.delete("/api/comments/:comment_id", deleteComment);

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
  console.error(err);
  res.status(500).send({ msg: err.message });
});

module.exports = app;
