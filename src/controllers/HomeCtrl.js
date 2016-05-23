var _ = require('underscore');
var Controller = require('../lib/Controller.js');
var HomeView = require('../views/HomeView.js');
var HomeModel = require('../models/HomeModel.js');

var HomeCtrl = Controller.extend({
  setView:function() {
    this.view = new HomeView();
  },
  setModel:function() {
    this.model = new HomeModel();
  },
  home: function() {
    console.log('hitting home!');
  }

});

module.exports = HomeCtrl;