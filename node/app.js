const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const crypto = require('crypto');
const sha1 = require('sha1');

//create connection
var connection=mysql.createConnection({host:'localhost',user:'root',password:'root'});
connection.connect((err) => {
  if(err){
   throw err;
   }
  console.log("database connected")

});

const app = express();
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.post('/create', (req,res)=> {
  console.log("got create request");
  var body='';
  req.on('data', chunk => {
    body+=chunk.toString();
  });
  req.on('end', ()=>{
    var request = JSON.parse(body);
    console.log("request.email:"+request.email);
    console.log("request.password:"+request.password);
    console.log(sha1(request.password));
    connection.query('select * from Login.user where user_id=? and password=?',[request.email, sha1(request.password)], (err, results)=>{
      if(err){
        console.log("error in query");
      }else{
      //throw err;
      console.log("sucess: "+results);
    }
    });
  })

  //console.log("e-mail: "+ JSON.parse(body).email + " password:" + JSON.parse(body).password);


  res.send("recieved request");

});

app.listen('8081', ()=>{
  console.log("connected");
});
