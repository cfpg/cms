var _ = require('underscore');
var Events = require('../lib/Events.js');
var Helper = require('../Helper.js');
var Controller = require('../lib/Controller.js');
var SiteView = require('../views/SiteView.js');
var SiteModel = require('../models/SiteModel.js');
var PageCtrl = require('../controllers/PageCtrl.js');
var fs = require('fs');

class SiteCtrl extends Controller {
  constructor() {
    super();

    this.isReady = false;
    this.view = new SiteView();
    this.model = SiteModel;
    this.pageCtrl = new PageCtrl();
    this.isReady = true;

    // Events
    Events.on('SiteCtrl::site::loaded',_.bind(this.onLoaded,this));
    Events.on('PageCtrl::page::loaded',_.bind(this.onPageLoaded,this));
    Events.on('SiteCtrl::site::ready',_.bind(this.onReady,this));

    this.loadSite();
  }

  loadSite() {
    var self = this;

    Events.on('SiteModel::byHost::success', function(site) {
      self.site = site;
      Events.emit('SiteCtrl::site::loaded', site);
    });

    SiteModel.byHost();
  }

  onLoaded(site) {
    console.log('Found site with id ' + site._id);
    // Load current page based on path
    this.pageCtrl.loadPage(site);
  }

  onPageLoaded(site, page, data) {
    this.site = site;
    this.page = page;
    this.template = page;
    this.data = data;

    Events.emit('SiteCtrl::site::ready', this.site, this.page);
  }

  onReady(site, page) {
    // Fetch route template
    Events.emit('Ctrl::route::ready', this.template, this.data);
  }

}

module.exports = SiteCtrl;