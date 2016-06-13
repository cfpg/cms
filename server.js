'use strict';
require('babel-register')({
  "presets": ["es2015"]
});

global.__base = __dirname + '/';

var CR = require('./src/CR.js');

var app = new CR();