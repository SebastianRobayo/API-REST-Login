const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "baq",
  password: "Asiste.2021",
  database: "users",
});

connection.connect();

module.exports = connection;
