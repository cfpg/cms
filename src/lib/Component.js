import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';
import fs from 'fs';

var Events = require('../lib/Events.js');
var Model = require('../lib/Model.js');
var Helper = require('../Helper.js');

var componentSchema = new mongoose.Schema({
  'title' : {type: String, required: true, default: ''},
  'userId' : {type: Number, requried: true},
  'idString' : {type: String, required: true}
});

class Component extends Model {
	constructor() {
    super();
    this.table = 'pages';
    this.schema = pageSchema;
    this.load();

		console.log('halo');

    Events.on("Component::state::fetched", _.bind(this.onFetch, this));
	}

  findById(id) {
    // Fake component
    Events.emit("Component::state::fetched", {
      idString: "comain"
    });
  }

  onFetch(component) {
    this.component = component;
  }

  loadConfig() {
    fs.readFile(this.basePath + '');
  }

}


// Add methods from class to schema 
componentSchema.plugin(loadClass, Component);

// Export mongoose model 
module.exports = mongoose.model('Component', componentSchema);