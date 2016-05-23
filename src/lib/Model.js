var obj = require('../lib/obj.js');

var Model = obj.extend({
  schema:{},
  
  initialize:function() {
    this.table = null;
    this.url = ''
    this.mongooseSchema = new global.app.mongoose.Schema(schema || this.schema);
    this.mongooseModel = new global.app.mongoose(table, this.mongooseSchema);
  },

  getData:function() {
    if (!this.mongooseSchema || !this.mongooseModel) {
      console.error('Schema or Model not found when trying to getData: '+ JSON.stringify(this));
      return false;
    }

    return [];
  }
});

module.exports = Model;