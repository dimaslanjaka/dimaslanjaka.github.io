// node -r ts-node/register agc/src/drakorstation.ts
import { curly } from 'node-libcurl';
import { parse } from 'node-html-parser';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import config from './config';
import express from 'express';
import is_download_page from './utils/is_download_page';

const app = express();
const port = 3000;

app.get('*', (req, res) => {
  const pathname = req.path;
  const targetHost = 'https://drakorstation.pro';
  curly.get(targetHost + pathname).then((result) => {
    if (result.statusCode === 200) {
      const html = parse(result.data).querySelector('html');
      const title = 'Download ' + html.querySelector('h1[class*="post-title"]').innerText.replace(/\(\s?drakorstation\s?\)/gim, '');
      // modify meta
      const meta = html.querySelector('p.meta');
      const time = meta.querySelector('time').outerHTML;
      meta.replaceWith('Last updated ' + time);
      // modify hyperlinks
      html.querySelectorAll('a').forEach((a) => {
        if (!a.hasAttribute('title')) a.setAttribute('title', title);
        if (!a.hasAttribute('alt')) a.setAttribute('alt', title);
        a.setAttribute('rel', 'nofollow noopener noreferer');
        if (!a.classList.contains('home-thumb')) a.innerHTML = a.innerHTML.replace(/drakorstation.(id|com|net|pro|video|global)/gim, 'This Website');
        const href = a.getAttribute('href').replace(/https?:\/\/drakorstation.(id|com|net|pro|video|global)/gim, '');
        a.setAttribute('href', href);
        // create shadow link for hexo and safelink for external links
        if (href.startsWith('/') && !is_download_page(href) && !href.startsWith('//')) {
          a.setAttribute('new-href', href.replace(/\/$/, '.html'));
        } else {
          a.setAttribute('href', 'https://dimaslanjaka.github.io/page/safelink.html?url=' + Buffer.from(href).toString('base64'));
          a.setAttribute('target', '_blank');
        }
      });
      // remove ads
      html.querySelectorAll('script[src]').forEach((script) => {
        if (script.getAttribute('src').match(/snacklink|yawnspuker|bebi.com/)) script.remove();
      });

      let buildRender = html.toString().replace('</html>', readFileSync(join(__dirname, 'controller.html'), 'utf-8').replace('%trans_url%', 'http://backend.webmanajemen.com/agc/public') + '</html>');

      // if pathname not '/'
      if (pathname.length > 2) {
        console.log(`[post] ${title}`);
        const content = html.querySelector('article[id^="post"]');
        // detach footer from main content
        const content_footer = content.querySelector('footer');
        // extract links from footer
        const footer_links = [];
        content_footer.querySelectorAll('a').forEach((a) => {
          const href = a.getAttribute('href');
          // remove author, tag, category, comments from footer
          if (href.trim().match(/\/(author|tag|category)\/|#respond$/)) return a.remove();
          // remove pagination
          const text = a.innerText.replace(/(&.+;)/gim, '').trim();
          if (text.match(/(next|previous) post/gim) || a.innerHTML.match(/(next|previous) post/gim)) return a.remove();
          footer_links.push(a.outerHTML);
        });
        // remove footer from main content
        content.querySelector('footer').remove();
        const content_main = content.innerHTML;
        const buildContent = `<title>${title}</title>\n\n${content_main}<div id="footer-links" style="padding: 2px">${footer_links.join('<hr/>')}</div>`;
        //writeFileSync(join(process.cwd(), 'tmp/test.html'), buildContent);
        if (typeof req.query['info'] != 'undefined') buildRender = buildContent;
      }

      res.send(buildRender);
    }
  });
});

app.listen(port, () => {
  console.log(`AGC listening on port ${port}`);
});
