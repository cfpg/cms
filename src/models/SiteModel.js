var Model = require('../lib/Model.js');

class SiteModel extends Model {

  constructor() {
    super();

    this.table = 'sites';
    this.schema = {
      'title' : String,
      'userId' : Number,
      'domain' : String,
      'settings' : {}
    }
  }

}

module.exports = SiteModel;