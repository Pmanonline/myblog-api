const mysql = require("mysql2");

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "w3schools.com",
  database: "blogpost",
});

module.exports = db;
