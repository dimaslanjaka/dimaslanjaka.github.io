import axios from 'axios';
import { existsSync, readFileSync, statSync } from 'fs';
import { createWriteStream, writeFile, writeFileSync } from 'fs-extra';
import { cacheDir, join, write } from '../node/filemanager';
import { md5 } from '../node/md5-file';
import config from '../types/_config';

interface cacheDownloadImageData {
  /**
   * original save location
   */
  path: string;
  /**
   * base64 image data
   */
  content: string;
  pipe?: NodeJS.WritableStream;
}

/**
 * download images
 * @param src source url string
 * @param saveTo save directory path or file path
 * * If the Save target is a directory, then the file name will be searched by the 'Content-Disposition' header or based on MD5 Hash Source URL
 */
export default async function downloadImage(
  src: string,
  saveTo: string,
  cache = true
): Promise<Partial<cacheDownloadImageData>> {
  const e = new Error();
  if (!e.stack) {
    try {
      // IE requires the Error to actually be thrown or else the
      // Error's 'stack' property is undefined.
      throw e;
    } catch (e) {
      if (!e.stack) {
        //return 0; // IE < 10, likely
      }
    }
  }
  const stack = e.stack
    .toString()
    .split(/\r\n|\n/)
    .map((path) => {
      const split = path.split(':').map((s) => s.replace(/at\s/, '').trim());
      return {
        path: split[0],
        line: `${split[1]}:${split[2]}`
      };
    });
  const cacheLocation = join(
    cacheDir,
    md5(stack[1].path),
    md5(stack[1].line),
    md5(saveTo)
  );
  if (cache) {
    if (existsSync(cacheLocation)) {
      const parse = JSON.parse(
        readFileSync(cacheLocation).toString()
      ) as cacheDownloadImageData;
      const parseB64 = parse_base64_image(parse.content);
      const convert = base64_to_image(parseB64.base64, parse.path, null, null);

      if (typeof convert == 'string') {
        parse.path = convert;
        return parse;
      }
    }
  }
  const response = await axios({
    method: 'get',
    url: src,
    responseType: 'stream'
  });
  if (response.status === 200) {
    const mime = response.headers['content-type'];
    if (mime.startsWith('image')) {
      let filename: string = null;

      // get content disposition information
      if (Object.hasOwnProperty.call(response.headers, 'content-disposition')) {
        filename = response.headers['content-disposition']
          .match(new RegExp('filename=(.*)'))[1]
          .replaceAll('"', '');
      }
      // no content-disposition
      if (filename === null) {
        const ext = '.' + mime.split('/')[1];
        //return response.data.pipe(createWriteStream(tmp('downloaded-images', md5(src) + ext)));
        filename = md5(src) + ext;
      }
      if (typeof saveTo == 'string') {
        let stats: ReturnType<typeof statSync>;
        if (existsSync(saveTo)) stats = statSync(saveTo);
        let pipe: NodeJS.WritableStream = null;
        // save to directory
        if (stats && stats.isDirectory()) {
          pipe = response.data.pipe(createWriteStream(join(saveTo, filename)));
        } else {
          pipe = response.data.pipe(createWriteStream(saveTo));
        }
        const result = {
          /** save location */
          path: null,
          /** writable stream */
          pipe
        };

        if (Object.hasOwnProperty.call(pipe, 'path')) {
          if (config.verbose) console.log('saved to', pipe['path']);
          result.path = pipe['path'];
        }
        if (result.path) {
          const b64 =
            `data:${mime};base64,` +
            readFileSync(result.path).toString('base64');
          write(cacheLocation, {
            path: result.path,
            content: b64
          });
        }
        return result;
      }
    }
  }
}

/**
 * parse image base64 encoded
 * @param data
 * @returns
 */
function parse_base64_image(data: string) {
  const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  const match = data.match(reg);
  const baseType = {
    jpeg: 'jpg'
  };

  baseType['svg+xml'] = 'svg';

  if (!match) {
    throw new Error('image base64 data error');
  }

  const extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    /** extension name */
    extname: '.' + extname,
    /** base64 encoded */
    base64: match[2]
  };
}

/**
 * Convert image base64 data to img
 *
 * @param data
 * @param destpath
 * @param name default null
 * @param callback default null
 * @returns string path file
 * @example
 * // save to directory with filename
 * base64_to_image('data:image/png;base64,...', '/folder/name', 'file-name', function(err, filepath) {});
 * // remove first data:image/png;base64, from {@param data}
 * // save to file directly with callback
 * base64_to_image('base64_encoded_string', '/folder/filename.jpg', null, function(err, filepath) {});
 * // save to file directly without callback, return string
 * base64_to_image('base64_encoded_string', '/folder/filename.jpg', null, null);
 */
function base64_to_image(
  data: string,
  destpath: string,
  name: string | null = null,
  callback: null | ((arg0: NodeJS.ErrnoException, arg1: string) => any) = null
) {
  if (typeof data === 'string' && typeof name === 'string') {
    let filepath: string;
    if (data.startsWith('data:image')) {
      // if data:image persist
      const result = parse_base64_image(data);
      filepath = join(destpath, name + result.extname);
      if (typeof callback === 'function') {
        return writeFile(
          filepath,
          result.base64,
          { encoding: 'base64' },
          function (err) {
            callback(err, filepath);
          }
        );
      }
      writeFileSync(filepath, result.base64, { encoding: 'base64' });
    } else {
      filepath = destpath;
      if (typeof callback === 'function') {
        return writeFile(
          filepath,
          data,
          { encoding: 'base64' },
          function (err) {
            callback(err, filepath);
          }
        );
      }
      writeFileSync(filepath, data, { encoding: 'base64' });
    }

    return filepath;
  }
}

export { base64_to_image, parse_base64_image };
