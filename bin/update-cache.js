const { writeFileSync } = require('hexo-fs');
const md5File = require('md5-file');
const { join } = require('path');
const { spawn } = require('hexo-util');

const hash = md5File.sync('package-lock.json');
//console.log(`MD5 sum: ${hash}`);
writeFileSync(join(__dirname, '../.guid'), hash);
spawn('git', ['add', '.guid']).then(() => spawn('git', ['commit', '-m', 'update cache']));
