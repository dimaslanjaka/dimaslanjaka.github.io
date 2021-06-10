'use strict';

var fs   = require('fs');
var path = require('path');

var filePath = path.join(__dirname, '../source/css/style.css');

hexo.extend.helper.register('inlineCss', function (name) {
    var style = fs.readFileSync(filePath, 'utf8');
    return style;
});
