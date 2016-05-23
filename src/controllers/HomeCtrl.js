var _ = require('underscore');
var Controller = require('../lib/Controller.js');

var HomeCtrl = _.extend({
	
  template: 'index.html',

  home: function() {
    console.log('hitting home!');
  }

}, Controller);

module.exports = HomeCtrl;