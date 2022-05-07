/* IMPORT FROM OTHER PLATFORMS */
import { XMLParser } from 'fast-xml-parser';
import gulp from 'gulp';
import { existsSync, join, readFileSync, write } from '../../node/filemanager';
import config, { tmp } from '../../types/_config';
import axios, { AxiosResponse } from 'axios';

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
            if (wpAuthor['wp:author_email']) author.email = wpAuthor['wp:author_email'];
            if (wpAuthor['wp:author_display_name']) author.name = wpAuthor['wp:author_display_name'];

            let icon: string;
            if (channel.image) {
              if (channel.image.url) {
                const url = new URL(channel.image.url);
                const saveTo = join(config.root, config.source_dir, url.pathname);
                console.log('Saving site image to ', saveTo);
                const res = await axios.get<any, AxiosResponse<ArrayBuffer>>(url.toString(), {
                  responseType: 'arraybuffer',
                });
                if (res.status === 200) {
                  await write(saveTo, Buffer.from(res.data));
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
