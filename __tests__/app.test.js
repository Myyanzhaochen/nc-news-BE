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

describe("/api/topics", () => {
  test("GET 200, response an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        console.log(result);
      });
  });
});
