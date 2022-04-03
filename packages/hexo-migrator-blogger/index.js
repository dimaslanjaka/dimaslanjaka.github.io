var extend = hexo.extend,
    migrate = require('./lib/migrate');

extend.migrator.register('blogger', function(args) {

    var source = args._.shift(),
        target = hexo.source_dir + '_posts/';

    if (!source) {
        console.log('\nUsage: hexo migrate blogger <source>\n\nMore info: http://hexo.io/docs/migration.html\nhttps://github.com/hr6r/hexo-migrator-blogger\n');
    } else {
        migrate(source, target);
    }
});
