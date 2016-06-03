var _ = require('underscore');
var path = require('path');
var routes = require('./routes.json');
var Helper = require('./Helper.js');

class Router {
  constructor() {
    console.log('init router')
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
        console.log('Loading ... ' + self.helper.matchController(r) + '.js');
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
console.log(matched)
    // Controlling the machine
    // matched.initialize();

    console.log('matched is ready?', matched.isReady)
    var template = matched.template();
    var data = matched.data();
    console.log(template, data)
    if (!template || !data) {
      return this.render500();
    }

    return this.render(template, data);
  }

  render404(data) {
    return this.render('errors/404.html', data);
  }

  render500(data) {
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