var _ = require('underscore');
var Controller = require('../lib/Controller.js');
var SiteModel = require('../models/SiteModel.js');

class SiteCtrl extends Controller {
  constructor() {
    super();
    console.log('initializing from siteCtrl')
    this.isReady = false;
    
    this.view = this;
    this.model = new SiteModel();
    this.isReady = true;
  }

  home() {
    console.log('hitting home!');
  }

}

module.exports = SiteCtrl;