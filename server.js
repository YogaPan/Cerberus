var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var loginhtml = fs.readFileSync('./pages/login.html');
var boardhtml = fs.readFileSync('./pages/board.html');
var registerhtml = fs.readFileSync('./pages/register.html');
var chatroomhtml = fs.readFileSync('./pages/chatroom.html');
var createchatroomhtml = fs.readFileSync('./pages/create-chatroom.html');
var bodyParser = require('body-parser'); // for json
//var cookieParser = require('cookie-parser');
//var cookie = require('cookie');
var session = require('express-session');
/* // if using https
var https = require('https');
var options = {
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./certificate.pem')
};
var server = https.createServer(options, app);
*/

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'fuckyou',
  database : 'final_project'
});

var port = 8888;

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.use('/static', express.static('static'));
app.use(bodyParser.json());

//app.use(cookieParser("sdtKLL@*#&$^*@#&$LkjlklJlIHyugyu@#($*(!*@$@!yyvyvU"));
app.use(session({
  secret: "lisg;OIjg;oISFGRrie:JOIREj*&^%@asdfasdfewr234235j6574$&@^#%",
  cookie: { maxAge: 600 * 1000 }
}));


app.get('/test', function(req,res){ // test
  if(req.session.uid) {
    var s = "fuck";
    s += "%";
    res.write(s+"\n");
    res.write(req.session.uid+"\n");
    res.write(req.session.username+"\n");
    res.write(req.session.email+"\n");
    res.end();
  } else {
    res.write("Welcome!");
    res.end();
  }
  
  
});

app.get('/', function(req,res){ // client connect 140.136.150.75:[port]/
  res.writeHeader(200,{'Content-Type':'text/html'});
  res.write('<!DOCTYPE html><html><head><title>Welcome</title></head><body><font size="6" color="green"><b>WELCOME TO HOME PAGE!</b></font></body></html>');
  res.end();
});

app.get('/board', function(req,res){ // client connect 140.136.150.75:[port]/board
  if(req.session.uid){
    res.writeHeader(200,{'Content-Type':'text/html'});
    res.write(boardhtml); // response board.html
    res.end();
  }
  else{
    res.write("Please login.");
    res.end();
  }
});

app.get('/chatroom', function(req,res){ // client connect 140.136.150.75:[port]/chatroom
  if(req.session.uid){
    res.writeHeader(200,{'Content-Type':'text/html'});
    res.write(chatroomhtml); // response chatroom.html
    res.end();
  }
  else{
    res.write("Please login.");
    res.end();
  }
});

app.get('/create-chatroom', function(req,res){ // client connect 140.136.150.75:[port]/create-chatroom
  if(req.session.uid){
    res.writeHeader(200,{'Content-Type':'text/html'});
    res.write(createchatroomhtml); // response create-chatroom.html
    res.end();
  }
  else{
    res.write("Please login.");
    res.end();
  }
});

app.get('/logout', function(req,res){ // client connect 140.136.150.75:[port]/logout
  if(req.session.uid){
    req.session.destroy();
    res.write('{"success": true}');
    //res.write("cookie cleared.");
  }
  
  res.end();
});

app.get('/login', function(req,res){ // client connect 140.136.150.75:[port]/login
  res.writeHeader(200,{'Content-Type':'text/html'});
  res.write(loginhtml); // res login.html
  res.end();
});

app.get('/register', function(req,res){ // client connect 140.136.150.75:[port]/register
  res.writeHeader(200,{'Content-Type':'text/html'});
  res.write(registerhtml); // res register.html
  res.end();
});

app.post('/login', function(req,res){ // post 140.136.150.75:[port]/login
  console.log(req.body.username);
  console.log(req.body.password);
  // check if username and password are in database
  if(req.body.isEmail === false){ // check if using email or username
    connection.query('SELECT * FROM user WHERE username = "'+req.body.username+
    '" AND password = "'+req.body.password+'"', function (error, results, fields) { // check username and password
      if (error) throw error;
      if(results.length > 0){
        //res.cookie("cookie", req.body.username, {maxAge: 900000, signed: true});
        req.session.uid = results[0].id;
        req.session.username = results[0].username;
        req.session.email = results[0].email;
        res.write('{"success": true}');
        console.log("true");
      }
      else{
        res.write('{ "success": false, "message" : "incorrect username or password" }');
        console.log("false");
      }
      res.end();
    });
  }
  else{
    connection.query('SELECT * FROM user WHERE email = "'+req.body.username+
    '" AND password = "'+req.body.password+'"', function (error, results, fields) {  // check email and password
      if (error) throw error;
      if(results.length > 0){
        //res.cookie("cookie", req.body.username, {maxAge: 900000, signed: true});
        req.session.uid = results[0].id;
        req.session.username = results[0].username;
        req.session.email = results[0].email;
        res.write('{"success": true}');
        console.log("true");
      }
      else{
        res.write('{ "success": false, "message" : "incorrect email or password" }');
        console.log("false");
      }
      res.end();
    });
  }
});

app.post('/register', function(req,res){ // post 140.136.150.75:[port]/register
  // check if username and password are in database
  connection.query('SELECT * FROM user WHERE username = "'+req.body.username+'"', function (error, results, fields) { // check if username has been taken
    if (error) throw error;
    if(results.length <= 0){
      connection.query('SELECT * FROM user WHERE email = "'+req.body.email+'"', function (error, results, fields) {  // check if email has been taken
        if (error) throw error;
        if(results.length <= 0){
          connection.query('INSERT INTO user(username, password, email) VALUES("'+ // insert new user into database
          req.body.username+'", "'+req.body.password+'", "'+req.body.email+'")'
            , function (error, results, fields) {
            if (error) throw error;
            console.log(req.body.username+"\n"+req.body.password+"\n"+req.body.email);
            connection.query('SELECT * FROM user WHERE username = "'+req.body.username+'"' , function (error, results, fields) {
              if (error) throw error;
              req.session.uid = results[0].id;
              req.session.username = results[0].username;
              req.session.email = results[0].email;
              console.log("true");
              res.write('{"success": true}');
              res.end();
            });
          });
        }
        else{ // email has been taken
          console.log(req.body.username+"\n"+req.body.password+"\n"+req.body.email);
          console.log("false");
          res.write('{ "success": false, "message" : "email has been taken" }');
          res.end();
        }
      });
    }
    else{ // username has been taken
      console.log(req.body.username+"\n"+req.body.password+"\n"+req.body.email);
      console.log("false");
      res.write('{ "success": false, "message" : "username has already been taken" }');
      res.end();
    }
  });
});

app.post('/create-chatroom', function(req,res){ // client connect 140.136.150.75:[port]/create-chatroom
  if(req.session.uid){
    connection.query('INSERT INTO chatroom(name, manager) VALUES("'+ // insert new chatroom into database
    req.body.name+'", "'+req.session.uid+'")', function (error, results, fields) {
      if (error) throw error;
      connection.query('INSERT INTO chatmember(cid, uid, status) VALUES((SELECT max(id) FROM chatroom WHERE manager = '+
      req.session.uid+'),"'+req.session.uid+'", "accept" )', function (error, results, fields) {
        if (error) throw error;
        for(var i in req.body.users){
          connection.query('INSERT INTO chatmember(cid, uid, status) VALUES((SELECT max(id) FROM chatroom WHERE manager = '+
          req.session.uid+'),"'+req.body.users[i]+'", "pending" )', function (error, results, fields) {
            if (error) throw error;
          });
        }
      });
      res.write('{"success":true}');
      res.end();
    });
  }
  else{
    res.write("Please login.");
    res.end();
  }
});

app.post('/search', function(req,res){ // client connect 140.136.150.75:[port]/search
  if(req.session.uid){
    connection.query('SELECT id, username FROM user WHERE username LIKE "'+req.body.search+'%" AND id <> '+req.session.uid+' LIMIT 10', function (error, results, fields) {
      if (error) throw error;
      res.write("{users:[");
      for(var i in results){
        if(i == 0)
          res.write('{"id":'+results[i].id+',"name":"'+results[i].username+'"}');
        else
          res.write(',{"id":'+results[i].id+',"name":"'+results[i].username+'"}');
      }
      res.write("]}");
      res.end();
    });
  }
  else{
    res.write("Please login.");
    res.end();
  }
});

app.post('/board', function(req,res){ // client connect 140.136.150.75:[port]/board
  if(req.session.uid){
    connection.query('SELECT id, name FROM chatroom WHERE id IN (SELECT cid FROM chatmember WHERE uid = '+req.session.uid+
      ' AND status = "accept")', function (error, results, fields) {
      if (error) throw error;
      res.write("{chatroom:[");
      for(var i in results){
        if(i == 0)
          res.write('{"id":'+results[i].id+',"name":"'+results[i].name+'"}');
        else
          res.write(',{"id":'+results[i].id+',"name":"'+results[i].name+'"}');
      }
      res.write("]}");
      res.end();
    });
  }
  else{
    res.write("Please login.");
    res.end();
  }
});

server.listen(port);
