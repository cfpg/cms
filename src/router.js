var _ = require('underscore');
var routes = require('./routes.json');

function Router() {
console.log('init router')
this.routes = routes;
this.req = null;
this.res = null;
};

Router.prototype.matchRoute = function() {
  var exists = false;
  _.each(routes, function(r, n) {
    console.log(n,r);

    if (r == this.req.url) {
      var view = require(routes[r]);
      exists = new view();
    }
  });

  return exists;
};

Router.prototype.view = function(req,res) {
  console.log('vieweing router')
  // Render current view base on route
  this.req = req || null;
  this.res = res || null;

  var matched = this.matchRoute();
  if (!matched) {
    return this.render404();
  }

  return matched.render();
};

Router.prototype.render404 = function() {

};

module.exports = Router;