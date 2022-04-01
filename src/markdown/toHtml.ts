/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import showdown from 'showdown';
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItSup from 'markdown-it-sup';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItAbbr from 'markdown-it-abbr';
import slugify from '../node/slugify/index';
import { tmp } from '../types/_config';
import { write } from '../node/filemanager';
import { parsePostReturn } from './transformPosts';
import memoize from 'memoizee';

export const converterOpt = { strikethrough: true, tables: true, tablesHeaderId: true };

/**
 * Transform markdown string to html string
 * @package showdown
 * @param str
 */
export default function renderShowdown(str: string) {
  const converter = new showdown.Converter(converterOpt);
  return converter.makeHtml(str);
}

const md = new MarkdownIt({
  html: true,
  // Autoconvert URL-like text to links
  linkify: true,
  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
  typographer: true,
  breaks: false,
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be useful for external highlighters.
});
md.linkify.set({ fuzzyEmail: false }); // disables converting email to link
md.use(MarkdownItSup)
  .use(MarkdownItSub)
  .use(MarkdownItMark)
  .use(MarkdownItAbbr)
  .use(MarkdownItFootnote)
  .use(MarkdownItAttrs, {
    allowedAttributes: ['id', 'class', /^regex.*$/],
  })
  .use(MarkdownItAnchor, {
    permalink: MarkdownItAnchor.permalink.headerLink(),
    slugify: (s) => slugify(s),
  });
md.renderer.rules.footnote_block_open = () => '<h4 class="mt-3">Footnotes</h4>\n' + '<section class="footnotes">\n' + '<ol class="footnotes-list">\n';

/**
 * Render markdown to html using `markdown-it`, `markdown-it-attrs`, `markdown-it-anchors`, `markdown-it-sup`, `markdown-it-sub`, `markdown-it-mark`, `markdown-it-footnote`, `markdown-it-abbr`
 * @see {@link https://www.npmjs.com/package/markdown-it-attrs}
 * @see {@link https://www.npmjs.com/package/markdown-it-attrs}
 * @see {@link https://www.npmjs.com/package/markdown-it-anchors}
 * @see {@link https://www.npmjs.com/package/markdown-it-sup}
 * @see {@link https://www.npmjs.com/package/markdown-it-sub}
 * @see {@link https://www.npmjs.com/package/markdown-it-mark}
 * @see {@link https://www.npmjs.com/package/markdown-it-footnote}
 * @see {@link https://www.npmjs.com/package/markdown-it-abbr}
 * @param str
 * @returns
 */
export function renderMarkdownIt(str: string) {
  return md.render(str);
}

/**
 * Fixable render markdown mixed with html
 * @todo render markdown to html
 * @param parse
 * @returns
 */
export function renderBodyMarkdown(parse: parsePostReturn) {
  let body = parse.body;
  // extract style, script
  const re = {
    script: /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g,
    style: /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/g,
  };
  const extracted: {
    script: any[];
    style: any[];
  } = {
    script: [],
    style: [],
  };
  for (const key in re) {
    if (Object.prototype.hasOwnProperty.call(re, key)) {
      const regex = re[key];
      const matchedScript = body.match(regex);
      if (matchedScript)
        matchedScript.forEach((str, i) => {
          extracted[key][i] = str;
          body = body.replace(str, `<!--${key}${i}-->`);
        });
    }
  }
  //write(tmp(parse.metadata.uuid, 'body.md'), body);
  //write(tmp(parse.metadata.uuid, 'extracted-body.json'), JSON.stringify(extracted, null, 2));
  // render markdown, after extracted script, style
  let md = renderMarkdownIt(body);
  //write(tmp(parse.metadata.uuid, 'render.md'), md);
  // restore extracted script, style
  for (const key in re) {
    if (Object.prototype.hasOwnProperty.call(re, key)) {
      const regex = new RegExp(`<!--(${key})(\\d{1,2})-->`, 'gm');
      //const rematch = md.match(regex);
      let m: RegExpExecArray;

      while ((m = regex.exec(md)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        const keyname = m[1];
        const index = m[2];
        const extractmatch = extracted[keyname][index];
        md = md.replace(m[0], extractmatch);
      }
    }
  }
  //write(tmp(parse.metadata.uuid, 'restored-render.md'), md);
  return md;
}
