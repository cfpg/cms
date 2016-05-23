var Model = require('../lib/model.js');

var PageModell = Model.extend({
  table: 'Pages',

  schema: {
    title: String,
    userId: Number,
    path: String,
    templateId: Number,
    settings: {}
  }
});

module.exports = PageModell;