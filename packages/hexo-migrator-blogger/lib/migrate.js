var async = require('async'),
    moment = require('moment'),
    request = require('request'),
    fs = require('fs'),
    tomd = require('to-markdown');

module.exports = function(source, target) {
    console.log('Fetching...');
    request(source, function(err, res, body) {
        if (err) throw err;
        var posts = JSON.parse(body).feed.entry;
        async.each(posts, function(item, cb) {
            var title = item.title['$t'];
            var file = title.replace(/\s/g,'-').replace(/[^A-z 0-9 -]/g,'');
            var published = item.published['$t'];
            var tags = '';
            if (item.category) {
                tags = item.category.map(prop('term'));
            }
            var header = [
                'title: |',
                '\t' +  title,
                'date: ' + moment(published).format('YYYY-MM-DD HH:mm:ss'),
                'tags: [' + tags + ']',
                '---',
            ];
            var content = item.content['$t'];
            fs.writeFile(target + file + '.md', header.join('\n') + '\n\n' + tomd(content), cb);
        }, function(err) {
            if (err) throw err;
            console.log('%d posts migrated.', posts.length);
        });
    });
};

function prop(attr) {
    return function(k) {
        return k[attr];
    };
}
