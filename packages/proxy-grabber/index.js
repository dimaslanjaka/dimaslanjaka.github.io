/*let proxyGrabber = require('./dist/traffic-generator/packages/proxy-grabber/src/index');
let dbC = require('./dist/traffic-generator/packages/proxy-grabber/src/db/construct');
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV == 'development') {
    require('ts-node').register({ projectSearchDir: __dirname, project: 'tsconfig.json' });

    proxyGrabber = require('./src/index');
    dbC = require('./src/db/construct');
  }
}
*/
//require('../../../hexo-seo/packages/js-prototypes/src/globals');
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV == 'development') {
    require('ts-node').register({ projectSearchDir: __dirname, project: 'tsconfig.json' });
  }
}

module.exports = require('./src/index');
module.exports.default = require('./src/index');
module.exports.db = require('./src/db/construct');
