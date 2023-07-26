const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
    } else {
      console.log("Connected to the employee_db database.");
    }
  });
  
  module.exports = connection;