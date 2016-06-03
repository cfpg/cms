var _ = require('underscore');
var obj = require('./lib/obj.js');
var fs = require('fs');
var path = require('path');

class Helper extends obj {
  constructor() {
    super();

    this.cache = [];
    this.cache['tmpl'] = [];
  }

  matchController(route) {
    return this.splitRoute(route)[0];
  }

  matchAction(route) {
    return this.splitRoute(route)[1];
  }

  splitRoute(route) {
    return route.split('::');
  }

  layout(data) {
    if (_.isUndefined(this.cache['_layout'])) {
      this.cache['_layout'] = this.fetchFile('base.html');
    }

    return this.cache['_layout'](data);
  }

  render(file, data) {
    if (_.isUndefined(this.cache['tmpl'][file]) || !_.isFunction(this.cache['tmpl'][file])) {

      // Add to cache
      this.cache['tmpl'][file] = this.fetchFile(file);

    }

    var tmpl = this.cache['tmpl'][file](data || {});
    var merge = this.layout({body: tmpl});

    return merge;
  }

  fetchFile(file) {
    var src = fs.readFileSync(path.join(global.templDir, file), 'utf8');
    return _.template(src);
  }

}

module.exports = Helper;