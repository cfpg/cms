var _ = require('underscore');
var obj = require('./lib/obj.js');
var fs = require('fs');
var path = require('path');

var Helper = new obj().extend({

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

    layout: function(data) {
      if (_.isUndefined(this.cache['_layout'])) {
        this.cache['_layout'] = this.fetchFile('base.html');
      }

      return this.cache['_layout'](data);
    },
    cache: {
      tmpl: {} // pre rendered templates
    },
    render: function(file, data) {
      if (_.isUndefined(this.cache['tmpl'][file]) || !_.isFunction(this.cache['tmpl'][file])) {

        // Add to cache
        this.cache['tmpl'][file] = this.fetchFile(file);

      }

      var tmpl = this.cache['tmpl'][file](data || {});
      var merge = this.layout({body: tmpl});

      return merge;
    },

    fetchFile:function(file) {
      var src = fs.readFileSync(path.join(global.templDir, file), 'utf8');
      return _.template(src);
    }

  }

});

module.exports = Helper;