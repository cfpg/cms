var Model = require('../lib/model.js');

var TemplateModel = Model.extend({
  table: 'Templates',

  schema: {
    userId: Number,
    filepath: String,
    title: String
  }
});

module.exports = TemplateModel;