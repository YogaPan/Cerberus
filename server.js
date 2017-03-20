var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var loginhtml = fs.readFileSync('./pages/login.html');
var registerhtml = fs.readFileSync('./pages/register.html');
var bodyParser = require('body-parser'); // for json
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
  password : 'hank1120',
  database : 'final_project'
});

var port = 8888;

app.use('/dist', express.static('dist'));
app.use(bodyParser.json());

app.get('/', function(request,response){ // client connect 140.136.150.75:[port]/
  response.writeHeader(200,{'Content-Type':'text/html'});
  response.write('<!DOCTYPE html><html><head><title>Welcome</title></head><body><font size="6" color="red"><b>WELCOME TO USER PAGE!</b></font></body></html>');
  response.end();
});

app.get('/login', function(request,response){ // client connect 140.136.150.75:[port]/login
  response.writeHeader(200,{'Content-Type':'text/html'});
  response.write(loginhtml); // response login.html
  response.end();
});

app.get('/register', function(request,response){ // client connect 140.136.150.75:[port]/register
  response.writeHeader(200,{'Content-Type':'text/html'});
  response.write(registerhtml); // response register.html
  response.end();
});

app.post('/login', function(request,response){ // post 140.136.150.75:[port]/login
  console.log(request.body.username);
  console.log(request.body.password);
  // check if username and password are in database
  if(request.body.isEmail === false){ // check if using email or username
    connection.query('SELECT * FROM user WHERE username = "'+request.body.username+
    '" AND password = "'+request.body.password+'"', function (error, results, fields) { // check username and password
      if (error) throw error;
      if(results.length > 0){
        response.write('{"success": true}');
        console.log("true");
      }
      else{
        response.write('{ "success": false, "message" : "incorrect username or password" }');
        console.log("false");
      }
      response.end();
    });
  }
  else{
    connection.query('SELECT * FROM user WHERE email = "'+request.body.username+
    '" AND password = "'+request.body.password+'"', function (error, results, fields) {  // check email and password
      if (error) throw error;
      reslen = results.length;
      if(results.length > 0){
        response.write('{"success": true}');
        console.log("true");
      }
      else{
        response.write('{ "success": false, "message" : "incorrect email or password" }');
        console.log("false");
      }
      response.end();
    });
  }
});

app.post('/register', function(request,response){ // post 140.136.150.75:[port]/register
  // check if username and password are in database
  connection.query('SELECT * FROM user WHERE username = "'+request.body.username+'"', function (error, results, fields) { // check if username has been taken
    if (error) throw error;
    if(results.length <= 0){
      connection.query('SELECT * FROM user WHERE email = "'+request.body.email+'"', function (error, results, fields) { // check if email has been taken
        if (error) throw error;
        if(results.length <= 0){
          connection.query('INSERT INTO user(username, password, email) VALUES("'+ // insert new user into database
          request.body.username+'", "'+request.body.password+'", "'+request.body.email+'")'
            , function (error, results, fields) {
            if (error) throw error;
            console.log(request.body.username+"\n"+request.body.password+"\n"+request.body.email);
            console.log("true");
            response.write('{"success": true}');
            response.end();
          });
        }
        else{ // email has been taken
          console.log(request.body.username+"\n"+request.body.password+"\n"+request.body.email);
          console.log("false");
          response.write('{ "success": false, "message" : "email has been taken" }');
          response.end();
        }
      });
    }
    else{ // username has been taken
      console.log(request.body.username+"\n"+request.body.password+"\n"+request.body.email);
      console.log("false");
      response.write('{ "success": false, "message" : "username has already been taken" }');
      response.end();
    }
  });
});

server.listen(port);
