var _ = require('underscore');

var obj = {
	initialize:function(){

  },
  extend:function(obj) {
    return _.extend(obj, this);
  }
};

module.exports = obj;