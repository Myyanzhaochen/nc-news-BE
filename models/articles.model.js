const db = require("../db/connection");

exports.selectArticles = () => {
  return db
    .query(
      `
      SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id)::INT AS comment_count
      FROM articles
      LEFT JOIN comments
        ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;
      `,
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectArticleById = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }

  return db
    .query(
      `
      SELECT articles.author,
             articles.title,
             articles.article_id,
             articles.body,
             articles.topic,
             articles.created_at,
             articles.votes,
             articles.article_img_url,
             COUNT(comments.comment_id)::INT AS comment_count
      FROM articles
      LEFT JOIN comments
        ON comments.article_id = articles.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;
      `,
      [article_id],
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "Article not found",
        });
      }
      return rows[0];
    });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  return db
    .query(
      `
      UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;
      `,
      [inc_votes, article_id],
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows[0];
    });
};
