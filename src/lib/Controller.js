class Controller {
  constructor() {
    console.log('initializing controller')
  }

  set view(v) {
    console.log('setting view',v)
    this._view = v;
  }

  get view() {
    return this._view;
  }

  set model(m) {
    this._model = m;
    if (this._model) {
      // this.model.initialize();
    }
  }

  get model() {
    return this._model;
  }

  template() {
    if (!this._view) {
      console.error('Trying to get template of Controller without View: '+JSON.stringify(this));
      return false;
    }
    return this._view.template;
  }

  data() {
    if (!this._model) {
      console.error('Trying to get data of Controller without Model: '+JSON.stringify(this));
      return false;
    }
    return this._model.data;
  }
}

module.exports = Controller;