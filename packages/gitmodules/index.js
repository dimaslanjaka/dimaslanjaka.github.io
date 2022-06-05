var fs = require('fs'),
  ini = require('ini');

var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

config.scope = 'local';
config.database.database = 'use_another_database';
config.paths.default.tmpdir = '/tmp';
delete config.paths.default.datadir;
config.paths.default.array.push('fourth value');

fs.writeFileSync(
  './config_modified.ini',
  ini.stringify(config, { section: 'section' })
);
