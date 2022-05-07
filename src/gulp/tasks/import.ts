/* IMPORT FROM OTHER PLATFORMS */
import { XMLParser } from 'fast-xml-parser';
import gulp from 'gulp';
import { existsSync, join, readFileSync, write } from '../../node/filemanager';
import config, { tmp } from '../../types/_config';
import downloadImage from '../../curl/download-image';

const homepage = new URL(config.url);

gulp.task('import', async () => {
  const platforms = config.import.platform;
  if (Object.hasOwnProperty.call(platforms, 'wordpress')) {
    console.log('wordpress import found');
    const files: string[] = platforms.wordpress;
    for (let i = 0; i < files.length; i++) {
      const file = join(config.root, 'import', files[i]);
      if (existsSync(file)) {
        const XMLdata = readFileSync(file).toString();
        const parser = new XMLParser();
        const jObj = parser.parse(XMLdata);
        if (typeof jObj === 'object' && jObj.rss) {
          const rss = jObj.rss;

          if (rss.channel) {
            const channel = rss.channel;
            /** global author */
            const author: Partial<typeof config.author> = {};
            const wpAuthor = channel['wp:author'];
            delete channel['wp:term'];
            delete channel['wp:tag'];
            delete channel['wp:category'];
            if (wpAuthor['wp:author_email']) author.email = wpAuthor['wp:author_email'];
            if (wpAuthor['wp:author_display_name']) author.name = wpAuthor['wp:author_display_name'];

            let icon: string;
            if (channel.image) {
              if (channel.image.url) {
                const url = new URL(channel.image.url);
                homepage.pathname = url.pathname;
                icon = homepage.toString();
                const saveTo = join(config.root, config.source_dir, url.pathname);
                //console.log('[import][wordpress] saving site image');
                await downloadImage(url.toString(), saveTo);
                //console.log('[import][wordpress] image saved', download.path);
                //console.log('[import][wordpress] image url', icon);
              }
            }

            let posts: WPPost[];
            if (channel.item) {
              posts = channel.item;
              for (let i = 0; i < posts.length; i++) {
                const post = posts[i];
                delete post['content:encoded'];
                delete post['wp:postmeta'];
                if (['page', 'post'].includes(post['wp:post_type']) && post['wp:status'] === 'publish') {
                  console.log(post.title, post.link);
                } else {
                  delete posts[i];
                }
              }
            }
          }
        }
        await write(tmp('wp-all.json'), jObj);
      }
    }
  }
});

export interface WPPost {
  title: string;
  link: string;
  pubDate: string;
  'dc:creator': string;
  guid: string;
  description: string;
  'content:encoded': string;
  'excerpt:encoded': string;
  'wp:post_id': number;
  'wp:post_date': string;
  'wp:post_date_gmt': string;
  'wp:post_modified': string;
  'wp:post_modified_gmt': string;
  'wp:comment_status': string;
  'wp:ping_status': string;
  'wp:post_name': string;
  'wp:status': string;
  'wp:post_parent': number;
  'wp:menu_order': number;
  'wp:post_type': string | 'page' | 'post';
  'wp:post_password': string;
  'wp:is_sticky': number;
  'wp:postmeta': WPPostmeta;
}

export interface WPPostmeta {
  'wp:meta_key': string;
  'wp:meta_value': number;
}
