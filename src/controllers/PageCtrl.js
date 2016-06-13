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
        path: "/"
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
    
    var compPath = __base + '/src/components/' + componentId + '/';
    var config = JSON.parse(fs.readFileSync(compPath + 'config.json', 'utf8'));
    console.log('Loading component: ' + config.name);
    this.page = compPath + config.deps.template;
    Events.emit("Component::state::loaded", componentId);

  }

  onComponentLoaded(component) {
    console.log('component ready', component);
    this.render(this.page, this.site, {});
  }

  render(page, site, data) {
    this.page = page;
    this.site = site;

    // We need to render this, find if it has any more views, load them and render them, etc
    // but for now...
    Events.emit('PageCtrl::page::loaded', site, page);
  }

}

module.exports = PageCtrl;