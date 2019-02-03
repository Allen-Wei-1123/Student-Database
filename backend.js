const express = require("express");
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var bodyParser= require("body-parser");


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'))
app.use(morgan('short'));


var db = mysql.createConnection({
                                  host : 'localhost',
                                  user : 'root',
                                  password: 'password',
                                  database : 'students'
                                  });

db.connect((error)=>{
           if(error){
                throw error;
           }else{
           }
           });
function getconnection(){
    return mysql.createConnection({
                                  host : 'localhost',
                                  user : 'root',
                                  password: 'password',
                                  database : 'students'
      });
}
app.post('/newstudent',(req,res)=>{
         console.log("hello");
         console.log(req.body.firstname);
         const firstname = req.body.firstname;
         const lastname = req.body.lastname;
         const gender = req.body.sex;
         const month = req.body.month;
         const date = req.body.date;
         const year = req.body.year;
         const age = req.body.age;
         const birthday = month+"/"+date+"/"+year;
         var sql = "insert into students.infos values(0,?,?,?,?,?);";
         getconnection().query(sql,[firstname,lastname,gender,birthday,age],(error,result)=>{
                    if(error){
                        console.log("failed to insert user");
                        result.sendStatus(500);
                        return
                    }else{
                        console.log("info stored");
                    }
        });
         
         res.end();
})

app.post('/db',(req,res)=>{
        var sql = "select * from students.infos where studentid = ?";
        getconnection().query(sql,[req.body.studentid],(err,row)=>{
                 if(err){
                    console.log("failed to insert user",err);
                              res.sendStatus(500);
                    return
                 }else{
                              console.log("good");
                              res.json(row);
                 }
                 })
})
app.post('/update',(req,res)=>{
         const firstname = req.body.firstname;
         const lastname = req.body.lastname;
         const gender = req.body.sex;
         const month = req.body.month;
         const date = req.body.date;
         const year = req.body.year;
         const age = req.body.age;
         const birthday = month+"/"+date+"/"+year;
         const studentid = req.body.studentid;
         const sql = "UPDATE students.infos SET `First name` = ?,`Last name` = ?,`Gender` = ?,`Birthday` = ?,`Age` = ? where studentid = ?;";
         getconnection().query(sql,[firstname,lastname,gender,birthday,age,studentid],(err,row)=>{
                               if(err){
                               console.log("failed to insert user",err);
                               res.sendStatus(500);
                               return
                               }else{
                               console.log('done');
                               }
                               })
         res.end();
         
})

app.post('/delete',(req,res)=>{
         
         var sql = "delete from students.infos where studentid = ?;";
         getconnection().query(sql,[req.body.studentid],(err,row)=>{
                               if(err){
                                console.log("failed to insert user",err);
                                res.sendStatus(500);
                                return
                               }else{
                                    console.log('deleted');
                               }
            })
})


app.listen(3000);
