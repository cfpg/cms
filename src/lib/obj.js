var _ = require('underscore');


var obj = Object.create(Object.prototype);

obj.initialize = function(){
  // do nothing
};

obj.extend = function(obj) {
  return _.extend(obj, this);
};

module.exports = obj;