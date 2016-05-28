
/**

  # MAIN

**/
'use strict';
var _ = require('underscore');
var express = require('express');
var config = require('../conf/app/config');
var glob = require('glob');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var CR = function() {
	
  var THAT = this;

  // App
  this.config = config;
  this.app = express();
  global.app = this;

  // start mongodb
  this.mongoose = mongoose;
  this.mongoose.connect(config.db);

  this.db = this.mongoose.connection;
  this.db.on('error', function () {
    console.error('unable to connect to mongodb at '+ config.db);
    throw new Error('unable to connect to database at ' + config.db);
  });
  this.db.once('open', function() {
    console.log('Conectado a la DB');
    THAT.init();
  });

  // Define Models & Controllers
  this.models = glob.sync(config.root + '/app/models/*.js');
  this.models.forEach(function (model) {
    require(model);
  });

  require('../conf/app/express')(this.app, this.config);

  this.server = http.createServer(this.app);

  this.server.listen(this.config.port, function(){
    console.log("Escuchando en http://localhost:" + THAT.config.port + "/");
  });

};

CR.prototype.init = function() {
  var THAT = this;
  console.log('Changoojorojo inicializando...');
}

CR.prototype.getHome = function(req,res) {
  // Should call router to initialize controller and get correct view form controller,
  // Maybe serving a layout here is nice and just adding the inner view
  res.send(this.Router.view(req,res));
};

module.exports = CR;