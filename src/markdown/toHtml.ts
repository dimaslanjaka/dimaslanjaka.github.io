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
  return md.render(str, { langPrefix: 'language-' });
}
