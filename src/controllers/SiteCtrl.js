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
    // Load current page based on path
    this.pageCtrl.loadPage(site);
  }

  onPageLoaded(site, page, data, component) {
    this.site = site;
    this.page = page;
    this.component = component;
    this.template = this.component.routes[global.req.path];
    this.data = data;

    if (!this.template) {
      throw "No template found for route " + global.req.path;
    }

    // Fetch route template
    Events.emit('Ctrl::route::ready', __base + '/src/components/' + this.component.name + '/' + this.template, this.data);
  }

  getRoutes() {
    console.log('ongetRoutes',this)
    return this.component.getRoutes();
  }

}

module.exports = SiteCtrl;