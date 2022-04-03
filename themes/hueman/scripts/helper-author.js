hexo.extend.helper.register('get_author_name', function (post, config) {
  if (post && post.author) {
    if (post.author.name) return post.author.name;
    if (post.author.nick) return post.author.nick;
    return post.author;
  } else if (config && config.author) {
    if (config.author.name) return config.author.name;
    if (config.author.nick) return config.author.nick;
    return config.author;
  }
  return 'Default Author';
});
