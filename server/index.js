const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors');
const { response } = require('express');

const connection = mysql.createConnection({
    host: "localhost",
    database: "userdb",
    user: "root",
    password: "minnabinwin"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))



app.post('/api/register', function(req, res) {

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password


const sql = "INSERT INTO `user-tab` (`name`, `email`, `password`) VALUES (?, ?, ?);"
const checkE = "SELECT `email` FROM userdb.`user-tab` where `email` = ?;"
connection.query(checkE, [email], (err, result) => {
    if(err){
        res.send({err: err})
    }
    else {
        if(result.length > 0)
        {
            res.send({ message: "User already have an accout assigned to this Email!!!"})
        }
        else
        {

            connection.query(sql, [name, email, password], (err, result) => {
                if(err){
                    console.log("user is not added!!!")
                }
                else {
                    res.send(result);
                    console.log("Registered!!!")
                }
            })

        }
    }
})

})






app.post('/api/login', function(req, res) {

    const email = req.body.email;
    const password = req.body.password

const sql2 = "select * from `user-tab` where `email` = ? AND `password` = ?;"
connection.query(sql2, [email, password], (err, result) => {
    if(err){
       res.send({err: err})
        console.log("user not found!!")
    }
    if(result.length > 0)
    {
        res.send(result);
    }
    else {
            res.send({ message: "Wrong username/password combination!"})
    }
})
})






app.listen(3001, () => {
    console.log("We are running on prot 3001")
    connection.connect(function(err) {
        if(err) throw err;
        console.log('Database is connected!!')
    })
})