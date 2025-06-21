// import { config } from "dotenv";


// config();
// // require('dotenv').config();
// // const DB_PASSWORD = process.env.DB_PASSWORD;

// export  default{
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     user:process.env.USER || "",
//     password: process.env.PASSWORD || ""
// }

import { config } from "dotenv";


// config();
require('dotenv').config();
const DB_PASSWORD = process.env.DB_PASSWORD;

export  default{
    host: process.env.HOST,
    database: process.env.DATABASE,
    user:process.env.USER || "",
    password: DB_PASSWORD || ""
}   