'use strict';

const spawn = require('../dist');

console.log(typeof spawn === 'function');
console.log(typeof spawn.sync === 'function');
console.log(typeof spawn.async === 'function');
