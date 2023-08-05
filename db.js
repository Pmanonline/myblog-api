// const mysql = require("mysql2");

// const db = mysql.createPool({
//   user: "admin",
//   host: "mysql-137535-0.cloudclusters.net",
//   password: "Lsk8f1Ay",
//   database: "blogpost",
//   IPAddress: "108.181.197.182",
//   port: "10041",
// });

// module.exports = db;

const mysql = require("mysql2");

const db = mysql.createPool({
  user: "root",
  host: "containers-us-west-131.railway.app",
  password: "DA2v82DifoLmL9bh2QA1",
  database: "railway",
  url: "mysql://root:DA2v82DifoLmL9bh2QA1@containers-us-west-131.railway.app:5860/railway",
  //   database: "blogpost",
  // IPAddress: "108.181.197.182",
  port: "5860",
});

module.exports = db;
