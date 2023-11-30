require("dotenv").config()
const mysql = require('mysql');
// const { pool } =require('pg')
// const { Client } =require('pg')

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// })
// const pool = new Client({
//     user: "abbasuz1_abbas",
//     host: "localhost",
//     database: "abbasuz1_test",
//     password: ")!jsaee{^2j(",
// })
// post 443
const connection = mysql.createConnection({
    user: "u2363199_abbas",
    host: "localhost",
    database: "u2363199_salonca",
    password: "Tn3RDK6V5W2ifuG",
})
connection.connect(err => {
    if(err) {
        console.log("Connect Error");
        console.log(err);
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = connection