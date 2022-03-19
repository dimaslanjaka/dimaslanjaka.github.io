import express from 'express';
import { readFileSync } from 'fs';
import { parse } from 'node-html-parser';
import { curly } from 'node-libcurl';
import { join } from 'path';
const app = express();
const port = 3000;

const url = 'https://translate.google.com/translate?sl=auto&tl=en&u=';
app.get('*', (req, res) => {
  const pathname = req.path;
  const targetHost = 'https://translate.google.com/translate?sl=auto&tl=id&u=' + encodeURIComponent('https://www.gsmarena.com');
  curly
    .get(targetHost + encodeURIComponent(pathname), { FOLLOWLOCATION: true })
    .then((result) => {
      if (result.statusCode === 200) {
        const html = parse(result.data).querySelector('html');
        const buildRender = html
          .toString()
          .replace('</html>', readFileSync(join(__dirname, 'controller.html'), 'utf-8').replace('%trans_url%', encodeURIComponent('http://backend.webmanajemen.com/agc/public')) + '</html>');

        html.querySelectorAll('a').forEach((a) => {
          const href = (() => {
            try {
              return new URL(a.getAttribute('href'));
            } catch (error) {
              return new URL('http://' + req.hostname);
            }
          })();
          a.setAttribute('href', href.pathname.trim().length ? href.pathname.trim() : '/');
          if (href.pathname.trim().length) {
            console.log(href.pathname);
          }
        });

        res.send(buildRender);
      }
    })
    .catch((e) => {
      console.log(e);
      if (!res.headersSent) res.status(200).json(e);
    });
});

app.listen(port, () => {
  console.log(`AGC listening on port ${port}`);
});
