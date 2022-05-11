/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import MarkdownIt from 'markdown-it';
import MarkdownItAbbr from 'markdown-it-abbr';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItSup from 'markdown-it-sup';
import showdown from 'showdown';
import { join, write } from '../node/filemanager';
import slugify from '../node/slugify/index';
import { postMap } from './transformPosts/parsePost';

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
  linkify: false,
  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
  typographer: true,
  breaks: false,
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be useful for external highlighters.
});
//md.linkify.set({ fuzzyEmail: false }); // disables converting email to link
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
md.renderer.rules.footnote_block_open = () =>
  '<h4 class="mt-3">Footnotes</h4>\n' + '<section class="footnotes">\n' + '<ol class="footnotes-list">\n';

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
 * * render {@link postMap.body}
 * @todo render markdown to html
 * @param parse
 * @param verbose dump
 * @returns
 */
export function renderBodyMarkdown(parse: postMap, verbose = false) {
  if (!parse) throw new Error('cannot render markdown of undefined');

  let body: string = parse.body || parse.content;
  if (typeof body != 'string') throw new Error('cannot render undefined markdown body');

  // extract code block first
  const re_code_block = /```[\s\S]*?```/gm;
  const codeBlocks: string[] = [];
  Array.from(body.matchAll(re_code_block)).forEach((m, i) => {
    const str = m[0];
    codeBlocks[i] = str;
    body = body.replace(str, `<codeblock${i}/>`);
  });
  if (verbose) {
    write(join(__dirname, 'tmp/extracted-codeblock.json'), codeBlocks);
  }

  // extract style, script
  const re = {
    script: /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gm,
    style: /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gm,
  };
  const extracted: {
    script: string[];
    style: string[];
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
    }
  }
  if (verbose) {
    write(join(__dirname, 'tmp/extracted-body.md'), body);
    write(join(__dirname, 'tmp/extracted-object.json'), extracted);
  }
  // restore extracted code blocks
  codeBlocks.forEach((s, i) => {
    const regex = new RegExp(`<codeblock${i}/>`, 'gm');
    Array.from(body.matchAll(regex)).forEach((codeblock) => {
      body = body.replace(codeblock[0], s);
    });
  });
  let rendered = renderMarkdownIt(body);
  if (verbose) write(join(__dirname, 'tmp/rendered.md'), rendered);
  // restore extracted script, style
  for (const key in re) {
    if (Object.prototype.hasOwnProperty.call(re, key)) {
      const regex = new RegExp(`<!--(${key})(\\d{1,2})-->`, 'gm');
      Array.from(rendered.matchAll(regex)).forEach((m) => {
        //console.log(match.length, regex, m[0], m[1], m[2]);
        const keyname = m[1];
        const index = m[2];
        const extractmatch = extracted[keyname][index];
        rendered = rendered.replace(m[0], extractmatch);
      });
    }
  }

  if (verbose) write(join(__dirname, 'tmp/restored.md'), rendered);
  return rendered;
}
