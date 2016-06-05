var _ = require('underscore');
var path = require('path');
var routes = require('./routes.json');
var Helper = require('./Helper.js');

class Router {
  constructor() {
    this.helper = new Helper();
    this.routes = routes;
    this.req = null;
    this.res = null;
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
    console.log(matched)
    if (!matched) {
      return this.render404();
    } else {
      matched = new matched();
    }

    // Controlling the machine
    var template = matched.template();
    var data = matched.data();
    
    if (!template) {
      return this.render500();
    }

    return this.render(template, data);
  }

  render404(data) {
    this.res.status(404);
    return this.render('errors/404.html', data);
  }

  render500(data) {
    this.res.status(500);
    return this.render('errors/500.html', data);
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