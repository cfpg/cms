import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

var Events = require('../lib/Events.js');
var Model = require('../lib/Model.js');
var Helper = require('../Helper.js');

var Component = require(__base + '/src/lib/Component.js');

var pageSchema = new mongoose.Schema({
  'title' : {type: String, required: true, default: ''},
  'userId' : {type: Number, requried: true},
  'siteId' : {type: mongoose.Schema.ObjectId, required: true},
  'templates' : {type: Array, required: false, default: []},
  'settings' : {type: Object, required: false, default: {}}
});

class PageModel extends Model {

  constructor() {
    super();

    this.table = 'pages';
    this.schema = pageSchema;

    // this.load();
  }

  static findPage(where, cb) {
    return this.findOne(where, cb);
  }

}

// Add methods from class to schema 
pageSchema.plugin(loadClass, PageModel);

// Export mongoose model 
module.exports = mongoose.model('Page', pageSchema);