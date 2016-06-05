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
    this.isReady = true;

    // Events
    Events.on('SiteCtrl::site::ready',_.bind(this.onReady,this));

    this.loadSite();
  }

  home() {
    console.log('hitting home!');
  }

  loadSite() {
    var self = this;

    Events.on('SiteModel::byHost::success', function(site) {
      self.site = site;
      Events.emit('SiteCtrl::site::ready');
    });

    SiteModel.byHost();
  }

  onReady() {
    if (!this.site) {
      throw 'Error: site not loaded';
      return false;
    }

    // Fetch route template
    var template = this.template();
    var data = this.data();
    Events.emit('Ctrl::route::ready', template, data);
  }

}

module.exports = SiteCtrl;