var Controller = require(__base + '/src/lib/frontend/Controller');

class CoMainController extends Controller {
  constructor() {
    super();
console.log('initing comain')
    this.template = "main.html";
    this.name = "comain";
  }

  get routes() {
    return {
      '/' : 'main.html',
      '/register' : 'register.html'
    };
  }

}

module.exports = CoMainController;