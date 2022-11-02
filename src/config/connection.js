require('dotenv').config()
const mysql = require('mysql2');

//Poner credenciales de aws aqui
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    //port:3306,
    database:"PicSpace"
});

//connection export
module.exports = pool.promise();