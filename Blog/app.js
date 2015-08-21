var express = require('express');
var app = express();
var consolidate = require('consolidate');
var MongoClient = require('mongodb').MongoClient;

var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');

var routes = require('./routes');
var dbName = "blog";

MongoClient.connect('mongodb://localhost:27017/'+dbName, function(err, db) {
    if(err) throw err;

    // Register our templating engine
    app.engine('html', consolidate.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(bodyParser.urlencoded({ extended: false }))

    // Application routes
    routes(app, db);

    app.listen(8082);
    console.log('Express server listening on port 8082');
});
