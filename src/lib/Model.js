function Model(table, schema) {
	this.table = null;
  this.url = ''
  this.schema = new global.app.mongoose.Schema(schema || {});
  this.model = new global.app.mongoose(table, this.schema);
};

Model.prototype.init = function(name) {
  // needed?
};

module.exports = Model;