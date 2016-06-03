var _ = require('underscore');
var Controller = require('../lib/Controller.js');
var SiteView = require('../views/SiteView.js');
var SiteModel = require('../models/SiteModel.js');

class SiteCtrl extends Controller {
  constructor() {
    super();
    console.log('initializing from siteCtrl')
    this.isReady = false;
    console.log(new SiteView())
    this.view = new SiteView();
    this.model = new SiteModel();
    this.isReady = true;
  }

  home() {
    console.log('hitting home!');
  }

}

module.exports = SiteCtrl;