var express = require('express');
var app = express();
var reddit = require('../reddit.js');
var request = require('request-promise');
var mysql = require('promise-mysql');


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
    var mapped = response.map(function(value, index){
      return `
       
        <li class="post-item">
          <h2 class="post-item__title">
            <a href=${value.url}>${value.title}</a>
          </h2>
          <p>Created by ${value.user.username}</p>
        </li>
       
        `;
    });
    
    return `
    <!DOCTYPE html>
    <div id="posts">
      <h1>Posts</h1>
      <ul class="posts-list">
        ${mapped}
      </ul>
    </div>`;
    })
    .then(function(response){
      app.get('/posts', function(req, res){
        res.send(response);
    });
});


/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
