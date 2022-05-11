/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as ejs from 'ejs';
import { postMap } from '../markdown/transformPosts/parsePost';
import { join } from '../node/filemanager';
import { DynamicObject } from '../types';
import config, { ThemeOpt, theme_dir } from '../types/_config';
import * as author from './helper/author';
import * as date from './helper/date';
import * as excerpt from './helper/excerpt';
import * as keywords from './helper/keywords';
import * as tag from './helper/labels';
import * as locale from './helper/locales';
import * as thumbnail from './helper/thumbnail';

const homepage = new URL(config.url);
const internal_helpers = {
  iif: function <T>(cond: boolean, value: T): T {
    if (cond) return value;
  },
  url_fix: (str: string) => {
    const u = new URL(str);
    // remove multiple slashes
    u.pathname = u.pathname.replace(/\/+/, '/');
    return u.toString();
  },
  url_for: (str: string) => {
    homepage.pathname = str.replace(/\/+/, '/');
    return homepage.toString();
  },
};

type helper_types = typeof tag &
  typeof keywords &
  typeof excerpt &
  typeof thumbnail &
  typeof locale &
  typeof author &
  typeof date &
  typeof internal_helpers &
  DynamicObject;

const helpers: helper_types = Object.assign(author, date, locale, thumbnail, keywords, excerpt, tag, internal_helpers);

interface EJSOption extends ejs.Options, DynamicObject {
  _?: typeof helpers;
  page?: postMap;
  config?: typeof config;
  theme?: ThemeOpt;
}

export function renderFile(file: string, opts: EJSOption = {}) {
  //opts._ = helpers;
  opts.root = join(theme_dir, 'layout/layout.ejs');
  opts = Object.assign(helpers, opts);
  return ejs.renderFile(file, opts);
}

function render(content: string, opts: EJSOption = {}) {
  opts.root = join(theme_dir, 'layout/layout.ejs');
  opts = Object.assign(helpers, opts);
  const render = ejs.render(content, opts);
  //if (opts.async) return Promise.resolve(render);
  return render;
}

const ejs_object = {
  ejs,
  helpers,
  renderFile: renderFile,
  resolveInclude: ejs.resolveInclude,
  compile: ejs.compile,
  render: render,
  clearCache: ejs.clearCache,
  escapeXML: ejs.escapeXML,
  VERSION: ejs.VERSION,
  name: ejs.name,
  cache: ejs.cache,
  fileLoader: ejs.fileLoader,
  localsName: ejs.localsName,
  openDelimiter: ejs.openDelimiter,
  closeDelimiter: ejs.closeDelimiter,
  delimiter: ejs.delimiter,
  promiseImpl: ejs.promiseImpl,
  Template: ejs.Template,
};

export default ejs_object;
export { helpers };
