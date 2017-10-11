var http = require('http');
const https = require('https');
var express = require('express');
var app = express();
const fs = require('fs');
const options = {
  key: fs.readFileSync('ssl/private.key'),
  cert: fs.readFileSync('ssl/certificate.crt')
};
var server = https.createServer(options,app).listen(8888);
var io = require('socket.io')(server);
var crypto = require("crypto");
var bodyParser = require('body-parser'); // for json
app.use(bodyParser.json());
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'fuckyou',
  database : 'final_project'
});
var sharedsession = require("express-socket.io-session");
var session = require('express-session')({
  secret: "Haha&!@^#%&^!@%8787ni hao Ma?",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600 * 1000 }
});
io.use(sharedsession(session, {
    autoSave:true
}));
app.use(session);
var loginhtml = fs.readFileSync('./pages/login.html');
var boardhtml = fs.readFileSync('./pages/board.html');
var registerhtml = fs.readFileSync('./pages/register.html');
var chatroomhtml = fs.readFileSync('./pages/chatroom.html');
var createchatroomhtml = fs.readFileSync('./pages/create-chatroom.html');
app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.use('/', express.static('static'));
var port = 8888;
server.listen(8888, function() {
    console.log('Listenging on port 8888');
});

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

app.get('/error', function(req, res) {  //yanweitest
  res.send('Test error page');
  console.log(req.headers.host);
  console.log(req.url);
  console.log(req.secure);
  res.end();
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

app.get('/chatroom/*', function(req,res){ // client connect 140.136.150.75:[port]/chatroom
  if(req.session.uid){
    req.session.joinroom = req.url.substring(10);
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
    //console.log(req.body.name);
    
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
      connection.query('SELECT MAX(id) AS id FROM chatroom WHERE manager = '+req.session.uid, function (error, results, fields) {
        if (error) throw error;
        var cipher = crypto.createCipher('aes-256-cbc', 'IloveTzuyuilovetzuYu');
        var encrypted = cipher.update(results[0].id.toString(), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        connection.query('UPDATE chatroom SET url = "'+encrypted+'" WHERE id = '+results[0].id, function (error, results, fields) {
          if (error) throw error;
        });
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
  console.log(req.body.search);
  if(req.session.uid){
    connection.query('SELECT id, username FROM user WHERE username LIKE "'+req.body.search+'%" AND id <> '+req.session.uid+' LIMIT 10', function (error, results, fields) {
      if (error) throw error;
      res.write('{"users":[');
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
    connection.query('SELECT id, name, url FROM chatroom WHERE id IN (SELECT cid FROM chatmember WHERE uid = '+req.session.uid+
      ' AND status = "accept")', function (error, results, fields) { // user's chatrooms
      if (error) throw error;
      res.write('{"username":"'+req.session.username+'","chatroom":[');
      for(var i in results){
        if(i == 0)
          res.write('{"id":'+results[i].id+',"name":"'+results[i].name+'","url":"'+results[i].url+'"}');
        else
          res.write(',{"id":'+results[i].id+',"name":"'+results[i].name+'","url":"'+results[i].url+'"}');
      }
      res.write("],");
      connection.query('SELECT chatroom.id AS id, name, username FROM chatroom, user WHERE chatroom.id IN (SELECT cid FROM chatmember WHERE uid = '+req.session.uid+
        ' AND status = "pending") AND chatroom.manager = user.id', function (error, results, fields) { // invite chatrooms
        if (error) throw error;
        res.write('"chatroom_invite":[');
        for(var i in results){
          if(i == 0)
            res.write('{"id":'+results[i].id+',"roomName":"'+results[i].name+'","from":"'+results[i].username+'"}');
          else
            res.write(',{"id":'+results[i].id+',"roomName":"'+results[i].name+'","from":"'+results[i].username+'"}');
        }
        res.write("]}");

        res.end();
      });
    });
  }
  else{
    res.write("Please login.");
    res.end();
  }
});

app.post('/invite', function(req,res){ // show invite notification
  console.log("invite");
  if(req.session.uid){
    connection.query('UPDATE chatmember SET status = "'+req.body.accept+'" WHERE cid = '+req.body.id+' AND uid = '+req.session.uid, function (error, results, fields) {
      if (error) throw error;
      res.write('{"success": true}');
      res.end();
    });
  }
  else{
    res.write("Please login.");
    res.end();
  }
});

io.on('connection', function (socket) {
  //console.log(socket.handshake.session.uid, socket.id, "io.on");
  //console.log(socket.htmlandshake.session.joinroom);
  socket.room = socket.handshake.session.joinroom;
  socket.join(socket.room);
  if(socket.handshake.session.uid!=undefined) {
    connection.query('UPDATE chatmember SET exist = 1 WHERE cid=(SELECT id FROM chatroom WHERE url="'+socket.room+'") AND uid='+socket.handshake.session.uid+'', function (error, results, fields) {
      if (error) throw error;
    });
  }
  var roomtmp = socket.room;
  var uidtmp = socket.handshake.session.uid;
  socket.on('disconnect', function () {
    console.log('fuckyou byebye');
    connection.query('UPDATE chatmember SET exist = 0 WHERE cid=(SELECT id FROM chatroom WHERE url="'+roomtmp+'") AND uid='+uidtmp+'', function (error, results, fields) {
      if (error) throw error;
    });
  });

  socket.on('new message', function (data) { // when the client emits 'new message', this listens and executes
    
    io.sockets.in(socket.room).emit('new message', {
      username: socket.handshake.session.username,
      message: data
    });
    var mid; // MessageID for the first message for the room
    var mid2; // MessageID for the message for the room
    var counter; // Count the message in the room is 1 or >1

    connection.query('INSERT INTO chatmessage(url, uid, message) VALUES("'+socket.room+'", '+socket.handshake.session.uid // Insert the message into database
      +', "'+data+'")', function (error, results, fields) {
      if (error) throw error;
    });

    connection.query('SELECT * FROM chatmessage WHERE url="'+socket.room+'" ORDER BY (id) DESC limit 1', function (error, results, fields) {
      //console.log(results);
      if(error) throw error;
      connection.query('SELECT COUNT(*) FROM chatmessage WHERE url="'+socket.room+'" ORDER BY (id) DESC limit 1', function (error, results, fields) {
        //console.log(results);
        //console.log(results[0]['COUNT(*)']);
        counter=results[0]['COUNT(*)'];
        if(results[0].mid==null&&counter==1) {
          mid=1;
          connection.query('UPDATE chatmessage SET mid='+mid+' WHERE url="'+socket.room+'" ORDER BY (id) DESC limit 1', function (error, results, fields) {
            if(error) throw error;
          });
          if(socket.handshake.session.uid!=undefined) {
            connection.query('UPDATE chatmember SET readid='+mid+' WHERE cid=(SELECT id FROM chatroom WHERE url="'+socket.room+'") AND uid='+socket.handshake.session.uid+'', function (error, results, fields) {
              if (error) throw error;
            });
          }
          else {
            console.log('Please login');
          }
        }
        else if(results[0].mid==null&&counter>1) {
          connection.query('SELECT mid FROM chatmessage WHERE url="'+socket.room+'" ORDER BY mid DESC limit 0,1;' , function (error, results, fields) {
            mid2=results[0].mid;
            mid2++;
            connection.query('UPDATE chatmessage SET mid='+mid2+' WHERE url="'+socket.room+'" ORDER BY (id) DESC limit 1', function (error, results, fields) {
              if(error) throw error;
            });
            if(socket.handshake.session.uid!=undefined) {
              connection.query('UPDATE chatmember SET readid='+mid2+' WHERE cid=(SELECT id FROM chatroom WHERE url="'+socket.room+'") AND uid='+socket.handshake.session.uid+'', function (error, results, fields) {
                if (error) throw error;
              });
            }
            else {
              console.log('Please login');
            }
            if(error) throw error;
          });
        }
        if(error) throw error;
      });
    });
    console.log(socket.handshake.session.uid, socket.handshake.session.username, data);
  });
});

function onConnection(socket) {
  socket.room = socket.handshake.session.joinroom;
  socket.join(socket.room);
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}
io.on('connection', onConnection);