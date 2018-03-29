require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

//define the port to run on
app.set('port', process.env.PORT); //process.env.PORT is for cloud9, instead of 3000 in video

//add middleware to console.log every request
// example GET, and the URL
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

//set status directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

//need this to tell express web server that node_modules is a folder we want to use
// added this as part of angular portion - video 10
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable/add routes
app.use('/api', routes);

//listen for requests
var server = app.listen(app.get('port'), function() {
console.log('the server is listening for requests on ' + app.get('port'));    
});