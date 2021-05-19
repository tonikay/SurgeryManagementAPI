const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;

dotenv.config();

const conn = mysql.createPool({
	'host' : process.env.HOST,
	'user' : process.env.USER,
	'password' : process.env.PASSWORD,
	'database' : process.env.DATABASE,
	'port' : process.env.DB_PORT,
	'connectionLimit' : 5
});

conn.getConnection((err, connection) => {
    return new Promise((resolve, reject) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                reject('Database connection was closed.');
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                reject('Database has too many connections.');
            }
            if (err.code === 'ECONNREFUSED') {
                reject('Database connection was refused.');
            }
        }
        console.log("DB is " + connection.state);
        if (connection) connection.release()
        resolve();
    });
});



module.exports=conn;