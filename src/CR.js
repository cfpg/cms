
/**

  # MAIN

**/
'use strict';
var _ = require('underscore');
var express = require('express');
var http = require('http');
var path = require('path');
var reload = require('reload');
var bodyParser = require('body-parser');
var Router = require('./router.js');

var CR = function() {
	
  var THAT = this;

  // App
  this.app = express();
  global.app = this;

  // start mongodb
  this.mongoose = require('mongoose');
  this.mongoose.connect('mongodb://splsh:culob310@ds023442.mlab.com:23442/splash');

  this.db = this.mongoose.connection;
  this.db.on('error', console.error.bind(console, 'connection error:'));
  this.db.once('open', function() {
    console.log('Conectado a la DB');
    THAT.init();
  });

  // Constants
  var PORT = 3344;

  // Define Controllers
  this.Router = new Router();

  global.publicDir = path.join(__dirname, 'assets');
  global.templDir = path.join(publicDir, '/templates');

  this.app.set('port', PORT);
  
  this.app.use(bodyParser.json()); //parses json, multi-part (file), url-encoded
  this.app.use('/assets', express.static('dist/'));

  this.server = http.createServer(this.app);

  this.server.listen(this.app.get('port'), function(){
    console.log("Escuchando en http://localhost:" + THAT.app.get('port') + "/");
  });

};

CR.prototype.init = function() {
  var THAT = this;
  console.log('Changoojorojo inicializando...');

  this.app.get('/*', _.bind(this.getRoute, this));
}

CR.prototype.getRoute = function(req,res) {
  // Should call router to initialize controller and get correct view from controller,
  // Maybe serving a layout here is nice and just adding the inner view

  // Sets request as global
  global.request = req;

  this.Router.view(
    req,res
  );
};

module.exports = CR;