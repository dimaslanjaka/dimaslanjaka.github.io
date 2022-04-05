escape_json(
  "sdfdfddf df-page.excerpt\tArticle excerpt\tstring\n" +
    "page.more\tContents except article excerpt\tstring\n" +
    "page.source\tThe path of the source file\tstring\n" +
    "page.full_source\tFull path of the source file\tstring\n" +
    "page.path\tThe URL of the article without root URL. We usually use url_for(page.path) in theme.\tstring\n" +
    "page.permalink\tFull (encoded) URL of the article\tstring\n" +
    "page.prev\tThe previous post, null if the post is the first post\t???\n" +
    "page.next\tThe next post, null if the post is the last post\t???\n" +
    "page.raw\tThe raw data of the article\t???\n" +
    "page.photos\tThe photos of the article (Used in gallery posts)\tarray of ???\n" +
    "page.link\tThe external link of the article (Used in link posts)\tstring\n" +
    "Post (post): Same as page layout but add the following variables.\n" +
    "\n" +
    "Variable\tDescription\tType\n" +
    "page.published\tTrue if the post is not a draft\tboolean\n" +
    "page.categories\tAll categories of the post\tarray of ???\n" +
    "page.tags\tAll tags of the post\tarray of ???\n" +
    "Home (index)\n" +
    "\n" +
    "Variable\tDescription\tType\n" +
    "page.per_page\tPosts displayed per page\tnumber\n" +
    "page.total\tTotal number of pages\tnumber\n" +
    "page.current\tCurrent page number\tnumber\n" +
    "page.current_url\tThe URL of current page\tstring\n" +
    "page.posts\tPosts in this page (Data Model)\tobject\n" +
    "page.prev\tPrevious page number. 0 if the current page is the first."
);

function escape_json(str) {
  let json = JSON.stringify(str);
  console.log(json);
}
