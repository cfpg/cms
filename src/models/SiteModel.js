var Model = require('./Model.js');
var _ = require('underscore');

var SiteModel = _.extend({
  table: 'Site'
}, Model);

module.exports = SiteModel;