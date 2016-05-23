var _ = require('underscore');
var path = require('path');
var routes = require('./routes.json');
var Helper = require('./Helper.js');

var Router = {
  initialize:function() {
    console.log('init router')
    this.routes = routes;
    this.req = null;
    this.res = null;
  },
  matchRoute: function() {
    var self = this;
    var exists = false;
    
    if (!this.req) {
      return exists;
    }

    _.each(routes, function(r, p) {
      if (p == self.req.url) {
        exists = require(path.join(__dirname, 'controllers/' + Helper.route.matchController(r) + '.js'));
      }
    });

    return exists;
  },
  view: function(req,res) {
    console.log('vieweing router')
    // Render current view base on route
    this.req = req || null;
    this.res = res || null;

    var matched = this.matchRoute();
    if (!matched) {
      return this.render404();
    }

    matched.initialize();

    return path.join(global.templDir, matched.getTemplate());
  },
  render404:function() {
    return path.join(global.templDir, '404.html');
  }
};

module.exports = Router;