const env = require("dotenv").config();
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  database: "movie_db",
  user: "root",
  password: process.env.PASSWORD,
});

module.exports = con;
