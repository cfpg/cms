var Model = require('../lib/Model.js');
var _ = require('underscore');

var SiteModel = _.extend({
  table: 'Site'
}, Model);

module.exports = SiteModel;