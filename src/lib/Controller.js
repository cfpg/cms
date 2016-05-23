var obj = require('../lib/obj.js');

var Controller = obj.extend({
  view:null,
  model:null,
  
  initialize:function() {
    this.setView();
    this.setModel();
  },
  setView:function() {
    this.view = null;
  },
  setModel:function() {
    this.model = null;
  },
  getTemplate:function() {
    if (!this.view) {
      console.error('Trying to get template of Controller without View: '+JSON.stringify(this));
      return false;
    }
    return this.view.template;
  },
  getData:function() {
    if (!this.model) {
      console.error('Trying to get data of Controller without Model: '+JSON.stringify(this));
      return false;
    }
    return this.model.getData();
  }
});

module.exports = Controller;