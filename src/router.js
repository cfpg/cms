var _ = require('underscore');
var path = require('path');
var routes = require('./routes.json');
var Events = require('./lib/Events.js');
var Helper = require('./Helper.js');

class Router {
  constructor() {
    this.helper = new Helper();
    this.routes = routes;
    this.req = null;
    this.res = null;

    Events.on('Ctrl::route::ready', _.bind(this.renderRoute, this));
  }

  matchRoute() {
    var self = this;
    var exists = false;
    
    if (!this.req) {
      return exists;
    }

    _.each(routes, function(r, p) {
      if (p == self.req.url) {
        exists = require(path.join(__dirname, 'controllers/' + self.helper.matchController(r) + '.js'));
      }
    });

    return exists;
  }

  view(req,res) {
    console.log('vieweing router')
    // Render current view base on route
    this.req = req || null;
    this.res = res || null;

    var matched = this.matchRoute();
    if (!matched) {
      return this.render404();
    } else {
      matched = new matched();
    }

    // Controlling the machine
    var template = matched.template();
    var data = matched.data();
    
    if (!template) {
      return this.res.end(this.render500());
    }
  }

  // Final output comes here!
  renderRoute(template,data) {
    var rendered = this.render(template, data);
    this.res.end(rendered);
  }

  render404(data) {
    console.log('rendering 404?????')
    this.res.status(404);
    return this.res.end(this.render('errors/404.html', data));
  }

  render500(data) {
    this.res.status(500);
    return this.res.end(this.render('errors/500.html', data));
  }

  render(file, data) {
    if (!file) {
      throw 'Error: trying to render non file: '+file;
      return false;
    }
    return this.helper.render(file,data);
  }

}

module.exports = Router;