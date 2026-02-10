const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});
//task 1 test
describe("GET /api/topics", () => {
  test("200: responds with an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics.length).toBeGreaterThan(0);

        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
});
//task 2 test
describe("Get /api/articles", () => {
  test("200: responds with articles array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);

        body.articles.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
        });
      });
  });
});
//task 3 test
describe("GET /api/articles/:article_id", () => {
  test("200: responds with a single article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).toBe(1);
        expect(body.article).toHaveProperty("body");
      });
  });
});
//task 4 test
describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with comments for the article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);

        body.comments.forEach((comment) => {
          expect(comment.article_id).toBe(1);
          expect(comment).toHaveProperty("body");
        });
      });
  });
});
//task 5 test
test("404: route not found", () => {
  return request(app).get("/api/not-a-route").expect(404);
});

test("400: invalid article_id", () => {
  return request(app).get("/api/articles/banana").expect(400);
});

test("404: article does not exist", () => {
  return request(app).get("/api/articles/9999").expect(404);
});
