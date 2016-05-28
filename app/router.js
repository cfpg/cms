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

    // Controlling the machine
    matched.initialize();
    var template = matched.getTemplate();
    var data = matched.getData();

    if (!template || !data) {
      return this.render500();
    }

    return this.render(template, data);
  },
  render404:function(data) {
    return this.render('errors/404.html', data);
  },
  render500:function(data) {
    return this.render('errors/500.html', data);
  },

  render:function(file, data) {
    return Helper.view.render(file,data);
  }
};

module.exports = Router;