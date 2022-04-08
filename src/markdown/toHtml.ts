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
import { parsePostReturn } from './transformPosts';
import { write } from '../node/filemanager';
import { tmp } from '../types/_config';

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

const verbose = true;

/**
 * Fixable render markdown mixed with html
 * @todo render markdown to html
 * @param parse
 * @returns
 */
export function renderBodyMarkdown(parse: parsePostReturn) {
  if (!parse) throw new Error('cannot render markdown of undefined');

  let body = parse.body;
  if (!body) throw new Error('cannot render undefined markdown body');

  // extract style, script
  const re = {
    script: /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gm,
    style: /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gm,
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
      Array.from(body.matchAll(regex)).forEach((m, i) => {
        const str = m[0];
        extracted[key][i] = str;
        body = body.replace(str, `<!--${key}${i}-->`);
      });
      /*const matchedScript = body.match(regex);
      if (matchedScript) {
        matchedScript.forEach((str, i) => {
          extracted[key][i] = str;
          body = body.replace(str, `<!--${key}${i}-->`);
        });
      }*/
    }
  }
  if (verbose) {
    write(tmp('renderBodyMarkdown', 'extracted.md'), body);
    write(tmp('renderBodyMarkdown', 'extracted.json'), extracted);
  }
  let rendered = renderMarkdownIt(body);
  if (verbose) write(tmp('renderBodyMarkdown', 'rendered.md'), rendered);
  // restore extracted script, style
  for (const key in re) {
    if (Object.prototype.hasOwnProperty.call(re, key)) {
      const regex = new RegExp(`<!--(${key})(\\d{1,2})-->`, 'gm');
      //const rematch = md.match(regex);
      const match = rendered.matchAll(regex);
      Array.from(match).forEach((m) => {
        //console.log(match.length, regex, m[0], m[1], m[2]);
        const keyname = m[1];
        const index = m[2];
        const extractmatch = extracted[keyname][index];
        rendered = rendered.replace(m[0], extractmatch);
      });
    }
  }
  if (verbose) write(tmp('renderBodyMarkdown', 'restored.md'), rendered);
  return rendered;
}
