'use strict';

var express = require('express');
var proxy = require('express-http-proxy');

var runServer = require('./runServer.js');
var port = 8080;

var app = express();

var output = '';

// runServer('54 maidens brush rd, australia', port);

app.get('/', function (req, res) {
  res.send('Enter location: <form action="/go"><input type="text" name="l"><button>Go</button></form>');
});

app.get('/go', function (req, res) {
  var location = req.query.l;
  runServer(location, port, function(child) {
    res.send('Starting server... <br /> <a href="/server">Check it</a>');

    child.stderr.on('data', function(chunk) {

      output += chunk.toString();
    });
  });
});

app.get('/output', function (req, res) {
  res.send('<textarea style="width:100%;height:100%;">' + output + '</textarea>');
});

app.use('/server', proxy('http://localhost:' + port));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
