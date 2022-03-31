/**
 * Extract Text
 * @todo remove style,script,comment html tag
 * @param {string} text
 * @returns {string}
 */
function extractText(text) {
  return text.replace(
    /<script(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/script>|<style(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/style>|<!--[\s\S]*?-->/gim,
    '',
  );
}

function cleanString(text) {
  // return text.replace(/[\"\']/gim, '');
  // @see {@link https://stackoverflow.com/a/6555220/6404439}
  // get only text without special chars
  // except spaces,.-_
  if (typeof text == 'string') return text.replace(/[^a-zA-Z0-9.,-_ ]/gm, '');
  return text;
}

hexo.extend.helper.register('cleanString', cleanString);

function excerpt_original(post) {
  let excerpt;
  if (typeof post.excerpt == 'string') {
    excerpt = post.excerpt.replace(/\<[^\>]+\>/g, '');
  } else if (typeof post.subtitle == 'string') {
    excerpt = post.subtitle.replace(/\<[^\>]+\>/g, '');
  } else if (typeof post.description == 'string') {
    excerpt = post.description.replace(/\<[^\>]+\>/g, '');
  } else if (typeof post.content == 'string') {
    excerpt = post.content.replace(/\<[^\>]+\>/g, '').substring(0, 200);
  } else if (typeof post.title == 'string') {
    excerpt = post.title;
  }
  // remove double/single quotes
  //return cleanString(excerpt);
  return excerpt;
}

/**
 * Excerpt Helper
 * @description Get the excerpt from a post
 * @example
 *     <%- excerpt(post) %>
 */
hexo.extend.helper.register('excerpt', function (post) {
  return excerpt_original(post) || post.title;
});
