import express from 'express';
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
    host: 'localhost',  // Hostname where MySQL server is running
    port: '3306',      // Port number for MySQL (default is 3306)
    user: 'Quentin',   // MySQL username
    password: 'password', // MySQL password
    database: 'Shopping Cart Database'
})

app.post('/', (req,res)=> {
    const sql = "INSERT INTO login (`name`,`email`,`password` VALUES(?)";
    bcrypt.hash(req.body.password.tostring(),salt, (err,hash)=>{
        if(err) return res.json({Error: "Error for hashing password"})
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result)=>{
            if(err) return res.json({
                Error: "Inserting data Error in server"
            });
            return res.json({Status: "success"})
        })
    })
   
})

app.listen(3306, () =>{
    console.log("Running...");
})