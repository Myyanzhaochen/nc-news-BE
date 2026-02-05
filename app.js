const { getArticles } = require("./controllers/articles.controller");

const express = require("express");
const { getTopics } = require("./controllers/topics.controller");

const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
module.exports = app;
