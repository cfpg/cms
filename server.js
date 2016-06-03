'use strict';
require('babel-register')({
  "presets": ["es2015"]
});
var CR = require('./src/CR.js');

var app = new CR();