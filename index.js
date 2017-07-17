var express = require('express');
var app = express();

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




/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
