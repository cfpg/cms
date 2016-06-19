var _ = require('underscore');
var fs = require('fs');

var Controller = require(__base + '/src/lib/Controller.js');
var Helper = require(__base + '/src/Helper.js');
var Events = require(__base + '/src/lib/Events.js');
var PageModel = require(__base + '/src/models/PageModel.js');
var Component = require(__base + '/src/lib/Component.js');

class PageCtrl extends Controller {

  constructor() {
    super();
console.log('new page ctrl')
    this.model = new PageModel();
    this.component = new Component();

    // Events
    Events.on('Component::state::loaded', _.bind(this.onComponentLoaded, this));
  }

  loadPage(site) {
    var self = this;
    var route = Helper.getCurrentRoute();
    
    if (!site || !site.id) {
      throw 'No site defined';
      return false;
    }

console.log(this,'trying to find page with ', {siteId: site._id, path: route})
    PageModel.findPage({
      siteId: site._id,
      path: route
    }, _.bind(function(err, page) {
      if (err) {
        throw err;
        return false;
      }
      
      // TODO fake response for now
      this.page = {
        componentId: "comain",
      };
      this.site = site;
      this.onFetch(this.page, this.site);
    }, this));
  }

  onFetch(page, site) {
    // Fetch template
    if (!page || !site) {
      Events.emit('Response::error::404', "Page or Site not Found");
      return false;
    }
console.log('component by id', page, site)
    
    // Load component
    this.loadComponent(page.componentId);
  }

  loadComponent(componentId) {
    
    var self = this;
    this.componentId = componentId;
    this.compPath = __base + '/src/components/' + componentId + '/';
    this.config = JSON.parse(fs.readFileSync(this.compPath + 'config.json', 'utf8'));
    console.log('Loading component: ' + this.config.name);

    // Load Site Component
    var loadedComponent = require(this.compPath + '/main.js');
    var component = new loadedComponent();
    console.log(component)
    this.page = this.compPath + this.config.deps.template;
    this.component = component;
    Events.emit("Component::state::loaded", this.component);
  }

  onComponentLoaded() {
    // Get component template based on path
    if (!this.component.routes) {
      throw 'No routes found for component ' + componentId;
    }

    var template = this.component.routes[global.req.path];
    this.render(this.page, this.site, {}, this.component);
  }

  render(page, site, data, component) {
    this.page = page;
    this.site = site;

    // We need to render this, find if it has any more views, load them and render them, etc
    // but for now...
    Events.emit('PageCtrl::page::loaded', site, page, {}, component);
  }

}

module.exports = PageCtrl;