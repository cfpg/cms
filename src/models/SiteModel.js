var Model = require('../lib/Model.js');

var SiteModel = Model.extend({
  table: 'Sites',

  schema: {
    'title' : String,
    'userId' : Number,
    'domain' : String,
    'settings' : {}
  }
});

module.exports = SiteModel;