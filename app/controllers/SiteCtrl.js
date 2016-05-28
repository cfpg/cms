var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('underscore');
var Controller = require('../lib/Controller.js');
var SiteModel = require('../models/SiteModel.js');

module.exports = function (app) {
  app.use('/', router);
};


var _ = require('underscore');
var Controller = require('../lib/Controller.js');
var SiteModel = require('../models/SiteModel.js');

var SiteCtrl = Controller.extend({
  routes: {
    '/' : this.homeRoute
  },
  homeRoute:function (req,res,next) {
    console.info('haalloo');
    
  },
  setView:function() {
    this.view = null;
  },
  setModel:function() {
    this.model = new SiteModel();
    this.model.initialize();
  },
  home: function() {
    console.log('hitting home!');
  }

});

module.exports = SiteCtrl;