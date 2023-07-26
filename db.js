const mysql = require("mysql2");

// const db = mysql.createPool({
//   user: "root",
//   host: "localhost",
//   password: "w3schools.com",
//   database: "blogpost",
// });

// module.exports = db;

const db = mysql.createPool({
  user: "admin",
  host: "mysql-137535-0.cloudclusters.net",
  password: "Lsk8f1Ay",
  database: "blogpost",
  IPAddress: "108.181.197.182",
  port: "10041",
});

module.exports = db;
