var _ = require('underscore');

function obj() {

}

//obj.prototype = Object.create(Function.prototype);

obj.prototype.constructor = obj;

obj.prototype.initialize = function(){
  // do nothing
};

obj.prototype.extend = function(obj) {
  return _.extend(obj, this);
};

module.exports = obj;