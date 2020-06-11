/* eslint-disable */           
const mysql = require('mysql')          //import mysql module in this file
const express = require('express')      //import express module in this file
const app = express()                   //create express server

const connection = mysql.createConnection({     //`createConnection()`method creates a connection to a mysql db with those properties below
    host: "127.0.0.1",          //host name of this database, in my case it's `localhost` or `127.0.0.1`
    database: "demo",           //Database name for this connection, my database name is `demo`
    user: "root",               //Database username, in my case it's `root`
    password: "",               //Database user password, in my case it's empty bcz i have no password
    multipleStatements: "true"  //Allows you to execute 2 or more SQL commands per query e.g. `.query(${one};${two})`
});

app.get('/', async (req, res) => {
    let con             //(function scoped)...con is defined here so that it can be used within both the try and the finally block
    try {
        const dbQuery = "SELECT name FROM people"     //Storing SQL statements in a variable to be used later in the `query()` method to query the database
        const dbQuery2 = "SELECT age FROM people"     //use const bcz the values for dbQuery & dbQuery2 will not be changed
        con = await connection.connect()           //Establishes/opens a session with the mysql server
        const results = await connection.query(`${dbQuery}; ${dbQuery2};`);
        res.send(results)              //Sends the database query results(rows) to the browser at the `/` path
    } catch (error) {        //`catch(){}` handles errors before the try code block above
        throw error
    } finally{
        if(con){
            con.end()       //Method `end()` sends queried data first, then ends the connection to the database
        }
    }
});

app.listen(4000, ()=>{              //our server `app` is listening on port 4000
    console.log('listening on http://localhost:4000')
})