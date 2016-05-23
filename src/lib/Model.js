var obj = require('../lib/obj.js');

var Model = obj.extend({
  initialize:function() {
    this.table = null;
    this.url = ''
    this.schema = new global.app.mongoose.Schema(schema || {});
    this.model = new global.app.mongoose(table, this.schema);
  }
});

module.exports = Model;