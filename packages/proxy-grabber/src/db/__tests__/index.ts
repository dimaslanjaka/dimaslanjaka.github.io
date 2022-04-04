import path from 'path';
import dbProxy from '..';
const db = new dbProxy(path.join(__dirname, 'databases'));
if (!db.exists('/test')) {
  db.push('/test/string', 'string db');
  db.push('/test/number', parseInt(Math.random().toString()));
  db.push('/test/float', parseFloat(Math.random().toString()));
  db.push('/test/object', { key: 'value' });
  db.push('/test/array', ['satu', 'dua', 'tiga']);
}

console.log(
  db.get('/test/array'),
  db.get('/test/object'),
  db.get('/test/number'),
  db.get('/test/float'),
  db.get('/test/string'),
);
