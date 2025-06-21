import mysql from "mysql2/promise";
//const mysql = require('mysql2');

import config from "./../config";

console.log(config.password)
let connection;

const connectionDB = async ()=>{
    if(!connection){
        connection = await mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        });
        console.log()
    }
}


const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection
}

// const mysql = require('mysql2/promise');


// import config from "./../config";

// const connection = mysql.createConnection({
//     host: config.host,
//     database: config.database,
//     user: config.user,
//     password: config.password
// });


// const getConnection = () => {
//     return connection;
// }

// module.exports = {
//     getConnection
// }