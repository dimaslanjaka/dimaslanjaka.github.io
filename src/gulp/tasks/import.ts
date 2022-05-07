/* IMPORT FROM OTHER PLATFORMS */
import { XMLParser } from 'fast-xml-parser';
import gulp from 'gulp';
import { existsSync, join, readFileSync, write } from '../../node/filemanager';
import config, { tmp } from '../../types/_config';
import downloadImage from '../../curl/download-image';

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
                icon = url.pathname;
                const saveTo = join(config.root, config.source_dir, url.pathname);
                console.log('Saving site image to ', saveTo);
                const _download = await downloadImage(url.toString(), saveTo);
                //console.log('image saved', download.path);
                /*const response = await axios.get<any, AxiosResponse<Stream>>(url.toString(), {
                  responseType: 'stream',
                });
                if (response.status === 200) {
                  const w = response.data.pipe(createWriteStream(saveTo));
                  w.on('finish', () => {
                    console.log('Successfully downloaded image!');
                  });
                }*/
              }
            }
          }
        }
        await write(tmp('wp-all.json'), jObj);
      }
    }
  }
});
