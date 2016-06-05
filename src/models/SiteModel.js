import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

var Model = require('../lib/Model.js');

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

  load() {
    var host = Helper.getCurrentHost();
    if (!host) {
      throw 'No Host found for Site';
      return false;
    }

    this._site = this.findOne({
      domain: host
    });

    return this._site;
  }

}

// Add methods from class to schema 
siteSchema.plugin(loadClass, SiteModel);

// Export mongoose model 
export default mongoose.model('Site', siteSchema);