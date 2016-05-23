var _ = require('underscore');
var Controller = require('../lib/Controller.js');
var SiteView = require('../views/SiteView.js');
var SiteModel = require('../models/SiteModel.js');

var SiteCtrl = Controller.extend({
  setView:function() {
    this.view = new SiteView();
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