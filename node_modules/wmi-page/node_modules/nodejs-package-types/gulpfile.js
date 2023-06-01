const { existsSync, rmSync, readFileSync, writeFileSync } = require('fs');
const gulp = require('gulp');
const { spawn } = require('hexo-util');
const { join } = require('path');
const pkgjson = require('./package.json');
const MarkdownIt = require('markdown-it');
const MarkdownItAbbr = require('markdown-it-abbr');
const MarkdownItAnchor = require('markdown-it-anchor');
const MarkdownItAttrs = require('markdown-it-attrs');
const MarkdownItFootnote = require('markdown-it-footnote');
const MarkdownItMark = require('markdown-it-mark');
const MarkdownItSub = require('markdown-it-sub');
const MarkdownItSup = require('markdown-it-sup');
const slugify = require('slugify');
const git = require('git-command-helper');

/**
 * build project main types
 */
const build = async function (done) {
  try {
    const dest = join(__dirname, 'tmp/typings/main');
    if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
    await spawn('tsc', ['-p', 'tsconfig.project.json'], { cwd: __dirname });
    gulp
      .src('*.*', { cwd: dest })
      .pipe(gulp.dest(join(__dirname, 'typings/main')))
      .once('end', function () {
        if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
        if (typeof done === 'function') done();
      });
  } catch {
    //
  }
};

const docs = async function () {
  const md = new MarkdownIt({
    html: true,
    // Autoconvert URL-like text to links
    linkify: true,
    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer: true,
    breaks: false,
    langPrefix: 'language-' // CSS language prefix for fenced blocks. Can be useful for external highlighters.
  });
  md.linkify.add('git:', 'http:'); // Add `git:` protocol as "alias"
  md.linkify.add('ftp:', null); // Disable `ftp:` protocol
  //md.linkify.set({ fuzzyEmail: false }); // disables converting email to link
  md.use(MarkdownItSup)
    .use(MarkdownItSub)
    .use(MarkdownItMark)
    .use(MarkdownItAbbr)
    .use(MarkdownItFootnote)
    .use(MarkdownItAttrs, {
      allowedAttributes: ['id', 'class', /^regex.*$/]
    })
    .use(MarkdownItAnchor, {
      permalink: MarkdownItAnchor.permalink.headerLink(),
      slugify: (s) => slugify(s)
    });
  md.renderer.rules.footnote_block_open = () =>
    '<h4 class="mt-3">Footnotes</h4>\n' + '<section class="footnotes">\n' + '<ol class="footnotes-list">\n';

  const template = ({ title, description, content }) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <meta name="description" content="${description}"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <style>
    pre { overflow-x: auto; tab-width: 4; background: #333; white-space: pre; padding: 5px; }
    pre code{ border-radius:4px;border:1px solid #292929;position:relative }
    pre code {
      font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
      color: whitesmoke;
    }
    pre code.language-css {color:#91a7ff}
    pre code.language-html {color:#aed581}
    pre code.language-javascript {color:#ffa726}
    pre code.language-jsonc {color:#4dd0e1}
    </style>
  </head>
  <body>

  <div class="container">
  ${content}
  </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script>
    document.querySelectorAll('table').forEach(el=> el.classList.add('table'))
    </script>
  </body>
</html>
  `;

  const outdir = join(__dirname, 'docs', pkgjson.name);
  const readme = join(__dirname, 'readme.md');
  const readmehtml = md.render(readFileSync(readme, 'utf-8'));
  writeFileSync(
    join(outdir, 'index.html'),
    template({
      title: 'nodejs-package-types - A Customized Types for non-typed npm package',
      description: pkgjson.description,
      content: readmehtml
    })
  );

  const gh = new git.default(outdir);
  try {
    await gh.add('.');
    await gh.commit('update docs ' + new Date());
    await gh.push();
  } catch {
    //
  }
};

exports.docs = docs;

exports.default = async function (done) {
  await build();
  /*const tslint = {
    extends: '@definitelytyped/dtslint/dt.json',
    rules: {
      'unified-signatures': false
    }
  };
  pkgjson.private = true;
  pkgjson.files = ['*.js', 'typings', 'hexo', 'skeljs', 'through2', 'hexo-log', 'hexo-bunyan', 'hexo-util'];
  mkdirp(join(__dirname, 'dist'));
  writeFile(join(__dirname, 'dist/tslint.json'), JSON.stringify(tslint, null, 4));
  writeFile(join(__dirname, 'dist/package.json'), JSON.stringify(pkgjson, null, 4));*/
  if (typeof done === 'function') done();
};
