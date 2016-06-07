import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

var Events = require('../lib/Events.js');
var Model = require('../lib/Model.js');
var Helper = require('../Helper.js');

var siteSchema = new mongoose.Schema({
  'title' : {type: String, required: false},
  'userId' : {type: Number, requried: true},
  'domain' : {type: String, required: true, unique: true},
  'settings' : {type: Object, required: false, default: {}}
});

class SiteModel extends Model {

  constructor() {
    super();

    this.table = 'sites';
    this.schema = siteSchema;
    this.load();
  }

  static byHost(h) {
    var host = h || Helper.getCurrentHost();
    if (!host) {
      throw 'No Host found for Site';
      return false;
    }

    this._site = this.findOne({
      domain: host
    }, function(err, site) {
      if (err) {
        throw err;
        return false;
      }

      Events.emit('SiteModel::byHost::success', site);
    });

    return this._site;
  }

}

// Add methods from class to schema 
siteSchema.plugin(loadClass, SiteModel);

// Export mongoose model 
module.exports = mongoose.model('Site', siteSchema);