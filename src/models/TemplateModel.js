import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

var Events = require('../lib/Events.js');
var Model = require('../lib/Model.js');
var Helper = require('../Helper.js');

var templateSchema = new mongoose.Schema({
  'userId': {type: Number, required: true},
  'idString': {type: String, required: true},
  'title': {type: String, required: true}
});

class TemplateModel extends Model {

  static loadTemplate(idString, eventString) {
    this.findOne({
      idString: idString
    }, function(err, template) {
      if (err) {
        throw err;
        return false;
      }

      Events.emit(eventString, template);
    });
  }

}

// Add methods from class to schema 
templateSchema.plugin(loadClass, TemplateModel);

// Export mongoose model 
module.exports = mongoose.model('Template', templateSchema);