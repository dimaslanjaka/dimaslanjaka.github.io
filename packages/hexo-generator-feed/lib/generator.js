'use strict';

const nunjucks = require('nunjucks');
const env = new nunjucks.Environment();
const { join } = require('path');
const { readFileSync } = require('fs');
const { encodeURL, gravatar, full_url_for } = require('hexo-util');
const crypto = require('crypto');

env.addFilter('uriencode', str => {
  return encodeURL(str);
});

env.addFilter('noControlChars', str => {
  return str.replace(/[\x00-\x1F\x7F]/g, ''); // eslint-disable-line no-control-regex
});

const md5 = function (data) {
  return crypto.createHash('md5').update(data).digest('hex');
};

env.addFilter('uuid', str => {
  let original = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'; // length 8-4-4-4-12
  if (str) {
    const hash = md5(str);
    original = original
      .replace(/^xxxxxxxx-xxxx/, hash.slice(0, 8) + '-' + hash.slice(9, 13))
      .replace(
        /xxx-xxxxxxxxxxxx$/,
        hash.slice(14, 17) + '-' + hash.slice(18, 30)
      );
  }
  return original.replace(/[xy]/g, c => {
    if (!str) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
    const r = 0;
    let v = r | 0x8;
    if (c === 'y') v = (r & 0x3) | 0x8;
    return v.toString(16);
  });
});

env.addFilter('authorname', str => {
  if (str.nick) return str.nick;
  if (str.name) return str.name;
  if (str.nickname) return str.nickname;
  if (typeof str === 'string') return str;
});

env.addFilter('authormail', str => {
  if (str.email) return str.email;
  if (str.mail) return str.mail;
  if (str.author) {
    if (str.author.email) {
      return str.author.email;
    } else if (str.author.mail) {
      return str.author.mail;
    }
  }
  if (typeof str === 'string') return str;
});

env.addGlobal('year', new Date().getFullYear().toString());
env.addFilter('domain', str => {
  return new URL(str).hostname;
});

module.exports = function (locals, type, path) {
  const { config } = this;
  const { email, feed, url: urlCfg } = config;
  const {
    icon: iconCfg,
    limit,
    order_by,
    template: templateCfg,
    type: typeCfg
  } = feed;

  env.addFilter('formatUrl', str => {
    return full_url_for.call(this, str);
  });

  let tmplSrc = join(__dirname, `../${type}.xml`);
  if (templateCfg) {
    if (typeof templateCfg === 'string') tmplSrc = templateCfg;
    else tmplSrc = templateCfg[typeCfg.indexOf(type)];
  }
  const template = nunjucks.compile(readFileSync(tmplSrc, 'utf8'), env);

  let posts = locals.posts.sort(order_by || '-date');
  posts = posts.filter(post => {
    return post.draft !== true;
  });

  if (posts.length <= 0) {
    feed.autodiscovery = false;
    return;
  }

  if (limit) posts = posts.limit(limit);

  let url = urlCfg;
  if (url[url.length - 1] !== '/') url += '/';

  let icon = '';
  if (iconCfg) icon = full_url_for.call(this, iconCfg);
  else if (email) icon = gravatar(email);

  const feed_url = full_url_for.call(this, path);

  const data = template.render({
    config,
    url,
    icon,
    posts,
    feed_url
  });

  return {
    path,
    data
  };
};
