
/**

  # MAIN

**/
'use strict';
var CR = function() {
	
  var THAT = this;
  var express = require('express');
  var http = require('http');
  var path = require('path');
  var reload = require('reload');
  var bodyParser = require('body-parser');

  // start mongodb
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://splsh:culob310@ds023442.mlab.com:23442/splash');

  this.db = mongoose.connection;
  this.db.on('error', console.error.bind(console, 'connection error:'));
  this.db.once('open', function() {
    // we're connected!
  });

  // Constants
  var PORT = 3344;

  // Define Controllers
  this.Router = require('./router.js');
  
  // App
  this.app = express();

  var publicDir = path.join(__dirname, 'assets');
  var templDir = path.join(publicDir, '/templates');

  this.app.set('port', PORT);
  // app.use(logger('dev'))
  this.app.use(bodyParser.json()); //parses json, multi-part (file), url-encoded

  this.app.get('/', function (req, res) {
    // Should call router to initialize controller and get correct view form controller,
    // Maybe serving a layout here is nice and just adding the inner view
    res.sendFile(path.join(templDir, 'index.html'));
  });

  this.server = http.createServer(this.app);

  //reload code here
  //optional reload delay and wait argument can be given to reload, refer to [API](https://github.com/jprichardson/reload#api) below
  reload(this.server, this.app);

  this.server.listen(this.app.get('port'), function(){
    console.log("Escuchando en http://localhost:" + THAT.app.get('port') + "/");
  });
};

CR.prototype.init = function() {
  console.log('Changoojorojo inicializando...')
}

module.exports = CR;