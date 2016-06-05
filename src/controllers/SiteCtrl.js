var _ = require('underscore');
var Events = require('../lib/Events.js');
var Helper = require('../Helper.js');
var Controller = require('../lib/Controller.js');
var SiteView = require('../views/SiteView.js');
var SiteModel = require('../models/SiteModel.js');

class SiteCtrl extends Controller {
  constructor() {
    super();

    console.log('initializing from siteCtrl, looking for host: ' + Helper.getCurrentHost())
    this.isReady = false;
    this.view = new SiteView();
    this.model = SiteModel;
    this.site = SiteModel.byHost();
    console.log(this.site)
    this.isReady = true;

    this.loadSite();
  }

  home() {
    console.log('hitting home!');
  }

  loadSite() {
    var self = this;

    Events.on('SiteModel::byHost::success', function(site) {
      console.log('site ready',site);
      self.site = site;
    });

    SiteModel.byHost();
  }

}

module.exports = SiteCtrl;