var View = require('../lib/View.js');

class SiteView extends View {
  constructor() {
    super();

    this.template = "index.html";
  }
}

module.exports = SiteView;