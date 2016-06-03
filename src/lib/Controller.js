class Controller {
  constructor() {
    console.log('initializing controller')
  }

  set view(v) {
    this.view = v || null;
  }

  get view() {
    return this.view;
  }

  set model(m) {
    this.model = m || null;
    if (this.model) {
      this.model.initialize();
    }
  }

  get model() {
    return this.model;
  }

  template() {
    if (!this.view) {
      console.error('Trying to get template of Controller without View: '+JSON.stringify(this));
      return false;
    }
    return this.view.template;
  }

  data() {
    if (!this.model) {
      console.error('Trying to get data of Controller without Model: '+JSON.stringify(this));
      return false;
    }
    return this.model.getData();
  }
}

module.exports = Controller;