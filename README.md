# NC News API

A RESTful API built with Node.js, Express, and PostgreSQL.

This API provides articles, topics, comments, and voting functionality for a news application.

---

## 🌍 Hosted Version

Live API:
https://nc-news-be-6q9q.onrender.com/api

---

## 🧱 Tech Stack

- Node.js
- Express
- PostgreSQL
- node-postgres (pg)
- Jest & Supertest
- Render (deployment)

---

## 📂 Project Structure

controllers/ → Handle request/response logic  
models/ → Database queries  
db/ → Database connection & seed files  
app.js → Express configuration  
listen.js → Server entry point

---

## 🚀 Available Endpoints

### GET /api/topics

Returns all topics.

### GET /api/articles

Returns all articles.

Supports queries:

- ?sort_by=
- ?order=
- ?topic=

### GET /api/articles/:article_id

Returns single article including comment_count.

### GET /api/articles/:article_id/comments

Returns comments for an article.

### POST /api/articles/:article_id/comments

Adds a new comment.

### PATCH /api/articles/:article_id

Updates article votes.

### DELETE /api/comments/:comment_id

Deletes a comment.

---

## 🖥 Running Locally

### 1. Clone repo

git clone <your-repo-url>

### 2. Install dependencies

npm install

### 3. Create environment variables

Create two files:

.env.development
PGDATABASE=nc_news

.env.test
PGDATABASE=nc_news_test

### 4. Set up database

npm run setup-dbs  
npm run seed

### 5. Run tests

npm test

### 6. Start server

npm run dev

Server runs on:
http://localhost:9090/api

---

## 📦 Minimum Versions

- Node.js v18+
- PostgreSQL v12+
