var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env = process.env.NODE_ENV || 'development';
var PORT = 3344;
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'splash-me'
    },
    port: PORT,
    db: 'mongodb://splsh:culob310@ds023442.mlab.com:23442/splash'
  },
  
  test: {
    root: rootPath,
    app: {
      name: 'splash-me'
    },
    port: PORT,
    db: 'mongodb://splsh:culob310@ds023442.mlab.com:23442/splash_test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'splash-me'
    },
    port: PORT,
    db: 'mongodb://splsh:culob310@ds023442.mlab.com:23442/splash_prod'
  }
};

module.exports = config[env];
