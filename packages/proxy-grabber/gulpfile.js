const proxyGrabber = require('.');
const dbProxy = require('.').db;
const path = require('path');
const gulp = require('gulp');
const Promise = require('bluebird');

const grabber = new proxyGrabber();

function testProxy(done) {
  grabber.test(1).then((resx) => {
    let xx = [];
    resx.map((rx) => {
      xx = xx.concat(rx);
    });
    console.log(xx);
    done();
  });
}

function testDB(done) {
  /**
   * @type {import('./src/db/construct')}
   */
  const db = new dbProxy(path.join(__dirname, 'databases'));
  db.debug = true;
  db.push('/test/string', 'string db');
  db.push('/test/number', parseInt(Math.random()));
  db.push('/test/float', parseFloat(Math.random()));
  db.push('/test/object', { key: 'value' });
  db.push('/test/array', ['satu', 'dua', 'tiga']);
  db.push('/test/arrayOfObjects', [{ key: 'value' }, { key: 'value2', fixed: 'fix' }, { key: 'value3' }]);

  console.log(
    db.get('/test/array'),
    db.get('/test/object'),
    db.get('/test/number'),
    db.get('/test/float'),
    db.get('/test/string'),
  );

  db.edit('/test/arrayOfObjects', { key: 'value', newKey: Math.random().toFixed(2) }, { key: 'value' });
  db.edit(
    '/test/arrayOfObjects',
    { key: 'value2', fixed: Math.random().toFixed(2), newKey: Math.random().toFixed(2) },
    { key: 'value2', fixed: 'fix' },
  );
  console.log(db.get('/test/arrayOfObjects'));

  done();
}

function getProxy(done) {
  Promise.all([grabber.method1(), grabber.method2(), grabber.method3()])
    .then((o) => {
      if (
        !o
          .map((ret) => {
            return ret.length > 0;
          })
          .every(Boolean)
      ) {
        throw new Error('some proxy get method return empty');
      } else {
        console.log('get proxy successful');
      }
      done();
    })
    .catch(
      /**
       *
       * @param {import('axios').AxiosError} e
       */
      (e) => {
        console.log(e.message);
        done();
      },
    );
}

exports.get = getProxy;
exports.db = testDB;
exports.test = testProxy;
exports.default = gulp.series(testDB, testProxy);
