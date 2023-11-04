// const { Client } = require("pg")
require("dotenv").config()
// const pool = new Client({
//     user: "salonca_user",
//     host: "https://dpg-cl2vipquuipc7383vf4g-a.oregon-postgres.render.com",
//     database: "salonca",
//     password: "UFz6vqcFCinaTi33cHFVmnVmOErYOsul",
//     port: 5432
// })
// import pg from 'pg';

const { Pool } =require('pg')

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
        console.log(err);
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool