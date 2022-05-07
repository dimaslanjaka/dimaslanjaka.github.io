/* IMPORT FROM OTHER PLATFORMS */
import { XMLParser } from 'fast-xml-parser';
import gulp from 'gulp';
import { existsSync, join, readFileSync, write } from '../../node/filemanager';
import config, { tmp } from '../../types/_config';

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
        if (jObj.channel) {
          console.log(jObj.channel['wp:author']);
        }
        await write(tmp('wp-all.json'), jObj);
      }
    }
  }
});
