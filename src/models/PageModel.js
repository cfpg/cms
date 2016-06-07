import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

var Events = require('../lib/Events.js');
var Model = require('../lib/Model.js');
var Helper = require('../Helper.js');

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
    this.load();
  }

  static loadPage(site) {
    var self = this;
    var route = Helper.getCurrentRoute();
    
    if (!site || !site.id) {
      throw 'No site defined';
      return false;
    }

    this.findOne({
      siteId: site._id,
      path: route
    }, function(err, page) {
      if (err) {
        throw err;
        return false;
      }

      self.page = page;
      self.render(page, site);
    });
  }

  static render(page, site) {
    // We need to render this, find if it has any more views, load them and render them, etc
    // but for now...
    Events.emit('SiteCtrl::site::ready', site, page);
  }

}

// Add methods from class to schema 
pageSchema.plugin(loadClass, PageModel);

// Export mongoose model 
module.exports = mongoose.model('Page', pageSchema);