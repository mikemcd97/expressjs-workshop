var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var reddit = require('../reddit.js');
var request = require('request-promise');
var mysql = require('promise-mysql');

app.set('view engine', 'pug');



// create a connection to our Cloud9 server
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root', 
    password : '',
    database: 'reddit',
    connectionLimit: 10
});

var myReddit = new reddit(connection);

app.get('/hello', function (req, res) {
  if (req.query.name){
    res.send('Hello,' + " " + req.query.name);
  }
  else{
    res.send('Hello World!');
  }
});

app.get('/calculator/:operation', function (req, res){
  var num1 = req.query.num1 || 0;
  var num2 = req.query.num2 || 0;
  if(req.params.operation === 'add'){
    res.send({operation: 'add', 
    firstOperand: num1, 
    secondOperand: num2, 
    solution: Number(num1)+Number(num2)});
  }
  else if(req.params.operation === 'multiply'){
    res.send({operation: 'multiply', 
    firstOperand: num1, 
    secondOperand: num2, 
    solution: num1 * num2});
  }
 
});


myReddit.getAllPosts()
  .then(function(response){
    app.get('/posts', function(req, res){
      res.render('posts-list', {posts: response});
    }); 
});

app.get('/new-post', function(req, res){
  res.render('create-content');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/createPost', urlencodedParser, function(req, res){
  
  var info = req.body;
  
  myReddit.createPost({
    userId: 1,
    title: info.title,
    url: info.url,
    subredditId: 1
      
});
  
  res.redirect('/posts');
 
  
});
  
app.use('/files', express.static('static_files'));


/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
