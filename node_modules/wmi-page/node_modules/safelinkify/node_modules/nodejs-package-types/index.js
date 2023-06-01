/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="node" />
/// <reference types="through2" />
/// <reference path="./typings/index.d.ts" />
/// <reference path="./hexo/index.d.ts" />
/// <reference path="./hexo-util/dist/index.d.ts" />
/// <reference path="./hexo-log/index.d.ts" />
/// <reference path="./hexo-bunyan/index.d.ts" />

const setup = require('./src/setup');

module.exports = setup;
