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

  static getCurrentHost() {
    if (!global.request) {
      throw 'No request global present';
      return false;
    }

    var host = global.request.hostname || null;
    if (host.split(':')) {
      host = host.split(':')[0]; // Ignore ports? for dev/now at least
    }
    return host;
  }

  static getCurrentPath() {
    if (!global.request) {
      throw 'No request global present';
      return false;
    }
console.log(global.request)
    return global.request.path || null;
  }

}

module.exports = Helper;