import { join, readFileSync, write } from '../../node/filemanager';
import config from '../../types/_config';
import 'js-prototypes';
import '../../node/cache-serialize';
import ejs_object from '../../ejs';

const ServerMiddleWare: import('browser-sync').Options['middleware'] = [
  {
    route: '/api',
    handle: function (req, res, next) {
      // write source/.guid
      if (req.url.includes('generate')) write(join(__dirname, config.source_dir, '.guid'), new Date());
      // write public_dir/.guid
      if (req.url.includes('copy')) write(join(__dirname, config.public_dir, '.guid'), new Date());
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.end(JSON.stringifyWithCircularRefs(new Error('Something went wrong. And we are reporting a custom error message.'), 2));
      next();
    },
  },
  {
    route: '/admin',
    handle: (req, res, next) => {
      ejs_object.renderFile(join(__dirname, 'public/admin.ejs')).then((rendered) => res.end(rendered));
    },
  },
];

export default ServerMiddleWare;
