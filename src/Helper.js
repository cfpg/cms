var _ = require('underscore');

var Helper = {

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

  }

};

module.exports = Helper;