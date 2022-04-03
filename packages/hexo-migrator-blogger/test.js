#!/usr/bin/env node

var migrate = require('./lib/migrate');

migrate('http://hr6r.blogspot.com/feeds/posts/default?alt=json&max-results=1', './');
