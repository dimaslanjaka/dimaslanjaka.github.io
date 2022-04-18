import axios from 'axios';
import { createWriteStream } from 'fs-extra';
import { join, statSync } from '../node/filemanager';
import 'js-prototypes';
import { md5 } from '../node/md5-file';
import config from '../types/_config';

/**
 * download images
 * @param src source url string
 * @param saveTo save directory path or file path
 * * If the Save target is a directory, then the file name will be searched by the 'Content-Disposition' header or based on MD5 Hash Source URL
 */
export default async function downloadImage(src: string, saveTo: string) {
  const response = await axios({
    method: 'get',
    url: src,
    responseType: 'stream',
  });
  if (response.status === 200) {
    const mime = response.headers['content-type'];
    if (mime.startsWith('image')) {
      let filename: string = null;

      // get content disposition information
      if (Object.hasOwnProperty.call(response.headers, 'content-disposition')) {
        filename = response.headers['content-disposition'].match(new RegExp('filename=(.*)'))[1].replaceAll('"', '');
      }
      // no content-disposition
      if (filename === null) {
        const ext = '.' + mime.split('/')[1];
        //return response.data.pipe(createWriteStream(tmp('downloaded-images', md5(src) + ext)));
        filename = md5(src) + ext;
      }
      if (typeof saveTo == 'string') {
        const stats = statSync(saveTo);
        let pipe: NodeJS.WritableStream = null;
        // save to directory
        if (stats.isDirectory()) {
          pipe = response.data.pipe(createWriteStream(join(saveTo, filename)));
        } else {
          pipe = response.data.pipe(createWriteStream(saveTo));
        }
        const result = {
          /** save location */
          path: null,
          /** writable stream */
          pipe,
        };
        if (Object.hasOwnProperty.call(pipe, 'path')) {
          if (config.verbose) console.log('saved to', pipe['path']);
          result.path = pipe['path'];
        }
        return result;
      }
    }
  }
}
