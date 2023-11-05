require("dotenv").config()
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