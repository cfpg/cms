var _ = require('underscore');
var obj = require('./lib/obj.js');
var fs = require('fs');
var path = require('path');

var Helper = obj.extend({

  route: {

    matchController:function(route) {
      return this.splitRoute(route)[0];
    },
    matchAction:function(route) {
      return this.splitRoute(route)[1];
    },
    splitRoute:function(route) {
      return route.split('::');
    }

  },

  view: {

    cache: {
      tmpl: {} // pre rendered templates
    },
    render: function(file, data) {
      if (_.isUndefined(this.cache['tmpl'][file]) || !_.isFunction(this.cache['tmpl'][file])) {

        var src = fs.readFileSync(path.join(global.templDir, file), 'utf8');
        var tmpl = _.template(src);

        // Add to cache
        this.cache['tmpl'][file] = tmpl;

      }

      return this.cache['tmpl'][file](data || {});
    }

  }

});

module.exports = Helper;