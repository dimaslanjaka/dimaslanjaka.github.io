process.cwd = () => __dirname;

const core = require('../');

core({ force: true });
