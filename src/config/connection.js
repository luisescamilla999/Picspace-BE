require('dotenv').config()
const mysql = require('mysql2');

//Poner credenciales de aws aqui
const pool = mysql.createPool({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    //port:3306,
    database:process.env.database
});

//connection export
module.exports = pool.promise();