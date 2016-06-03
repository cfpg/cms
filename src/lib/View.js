class View {
  contructor() {
    console.log('view initialized')
  }

  set template(t) {
    this._template = t;
  }

  get template() {
    return this._template;
  }
}

module.exports = View;