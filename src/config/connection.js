require('dotenv').config()
const mysql = require('mysql2');

//Poner credenciales de aws aqui
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    //port:3306,
    database:"picspace"
});

// Controlar errores de conexión
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
});

//connection export
module.exports = pool.promise();