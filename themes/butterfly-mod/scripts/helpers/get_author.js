/**
 * Butterfly
 * for get author name from object
 */

'use strict';

hexo.extend.helper.register('author_name', function (options = {}) {
  const { config } = this;
  const { author } = config;
  if (typeof author === 'string') return author;
  if (typeof author === 'object' && !Array.isArray(author)) {
    if ('name' in author) return author['name'];
    if ('nick' in author) return author['nick'];
  }
  return 'Default User';
});
