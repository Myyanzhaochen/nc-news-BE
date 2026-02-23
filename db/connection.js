const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

console.log("ENV:", ENV);
console.log("Looking for file:", `.env.${ENV}`);

require("dotenv").config({
  path: process.cwd() + `/.env.${ENV}`,
});

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};

const db = new Pool(config);

module.exports = db;
