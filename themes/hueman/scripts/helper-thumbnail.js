const noimage = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

/**
 * Thumbnail Helper
 * @description Get the thumbnail url from a post
 * @param {object} post
 * @example
 *     <%- thumbnail(post) %>
 */
function thumbnail(post) {
  let url = post.thumbnail || post.cover || noimage;
  if (!url && post.photos) {
    if (Array.isArray(post.photos)) return post.photos[0];
  }
  if (!url) {
    var imgPattern = /\<img\s.*?\s?src\s*=\s*['|"]?([^\s'"]+).*?\>/gi;
    var result = imgPattern.exec(post.content);
    if (result && result.length > 1) {
      url = result[1];
    }
  }
  return url;
}

hexo.extend.helper.register('thumbnail', thumbnail);

hexo.extend.helper.register('img_url', function (post, config) {
  const cover = thumbnail(post);
  // if start with protocol or slash
  if (/^https?:\/\/|^\//gm.test(cover)) {
    return cover;
  } else if (typeof config.logo == 'string') {
    return config.logo;
  }
  return noimage;
});

// LOCALES

// AUTHOR
