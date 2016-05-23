var _ = require('underscore');
var Controller = require('../lib/Controller.js');

var HomeCtrl = Controller.extend({
	
  template: 'index.html',

  home: function() {
    console.log('hitting home!');
  }

});

module.exports = HomeCtrl;