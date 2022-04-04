/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { dirname, existsSync, mkdirSync, statSync, writeFileSync } from '../node/filemanager';
import yaml from 'yaml';
import crypto from 'crypto';
import { readFileSync } from 'fs';
import chalk from 'chalk';
import config_yml, { ProjectConfig } from '../types/_config';
import { replacePath } from '../gulp/tasks/article-copy';
import CacheFile from '../node/cache';

export interface LooseObject {
  [key: string]: any;
}

export type parsePostReturn = LooseObject & {
  /**
   * Article metadata
   */
  metadataString?: string;
  fileTree?: {
    /**
     * [post source] post file from src-posts
     */
    source?: string;
    /**
     * [public source] post file from source_dir _config.yml
     */
    public?: string;
  };
  /**
   * _config.yml
   */
  config?: ProjectConfig | null;
  /**
   * Article metadata
   */
  metadata?: LooseObject & {
    /**
     * Article language code
     */
    lang: string;
    /**
     * Article title
     */
    title: string;
    subtitle: string;
    uuid?: string;
    updated?: string;
    date: string;
    description?: string;
    tags: string[];
    category: string[];
    photos?: string[];
    cover?: string;
    thumbnail?: string;
  };
  /**
   * Article body
   */
  body?: string;
};

/**
 * UUID V4 Generator
 * @param fromString generate based on string (unique based on this string)
 * @returns ex: a2d6fee8-369b-bebc-3d8e-b8ff2faf40d3
 */
export function uuidv4(fromString?: string) {
  let original = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'; // length 8-4-4-4-12
  if (fromString) {
    const hash = md5(fromString);
    original = original.replace(/^xxxxxxxx-xxxx/, hash.slice(0, 8) + '-' + hash.slice(9, 13)).replace(/xxx-xxxxxxxxxxxx$/, hash.slice(14, 17) + '-' + hash.slice(18, 30));
  }
  return original.replace(/[xy]/g, function (c) {
    if (!fromString) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    } else {
      const r = 0;
      let v = r | 0x8;
      if (c == 'y') v = (r & 0x3) | 0x8;
      return v.toString(16);
    }
  });
}

/**
 * PHP MD5 Equivalent
 * @param data
 * @returns
 */
export function md5(data: string) {
  return crypto.createHash('md5').update(data).digest('hex');
}

/**
 * Parse Hexo markdown post (structured with yaml and universal markdown blocks)
 * * return metadata {string & object} and body
 * * return null == failed
 * @param text file path or string markdown contents
 */
function parsePostOri(text: string): parsePostReturn | null {
  ///const regex = /---([\s\S]*?)---/;
  const regex = /^---([\s\S]*?)---[\n\s\S]\n/gim;
  let m: RegExpExecArray | { [Symbol.replace](string: string, replaceValue: string): string }[];
  /**
   * source file if `text` is file
   */
  const originalArg = text;
  const isFile = existsSync(text) && statSync(text).isFile();
  if (isFile) {
    text = readFileSync(text).toString();
  }

  try {
    while ((m = regex.exec(text)) !== null) {
      //if (originalArg.includes("Pets")) console.log(m);
      if (m[0]) {
        let meta: parsePostReturn['metadata'] = yaml.parse(m[1]); // header post
        //if (originalArg.includes("Pets")) console.log(meta);
        if (!meta.uuid) {
          let uid = m[0];
          if (meta.title && meta.webtitle) {
            uid = meta.title + meta.webtitle;
          } else if (meta.subtitle) {
            uid = meta.subtitle;
          } else if (meta.excerpt) {
            uid = meta.excerpt;
          } else if (meta.title) {
            uid = meta.title;
          }
          meta.uuid = uuidv4(uid);
          meta = Object.keys(meta)
            .sort()
            .reduce(
              (acc, key) => ({
                ...acc,
                [key]: meta[key],
              }),
              {}
            ) as parsePostReturn['metadata'];
        }
        // default category and tags
        if (!meta.category) meta.category = ['Uncategorized'];
        if (!meta.category.length) meta.category.push('Uncategorized');
        if (!meta.tags) meta.tags = [];

        // default excerpt/description
        if (meta.subtitle) {
          meta.excerpt = meta.subtitle;
          meta.description = meta.subtitle;
        }
        if (meta.description && !meta.excerpt) {
          meta.excerpt = meta.description;
        }
        if (meta.excerpt && !meta.description) {
          meta.description = meta.excerpt;
        }

        const result: parsePostReturn = {
          metadataString: m[0],
          metadata: meta,
          body: fixPostBody(text.replace(m[0], '')),
          config: config_yml,
        };
        // put fileTree
        if (isFile) {
          result.fileTree = {
            source: replacePath(originalArg, '/source/_posts/', '/src-posts/'),
            public: replacePath(originalArg, '/src-posts/', '/source/_posts/'),
          };
          //console.log(result.fileTree);
        }
        return result;
      }
    }
  } catch (e) {
    //if (debug) console.error(e.message, originalArg);
    console.error('fail parse markdown post', chalk.redBright(originalArg), 'original file of', chalk.magentaBright(originalArg.replace('/source/_posts/', '/src-posts/')));
  }
  return null;
}

const cache = new CacheFile('parsePost');

/**
 * Cacheable parsePost
 * @param text file path or content markdown
 * @param hash cache key
 * @returns
 */
export function parsePost(text: string, hash: string = null) {
  let result: parsePostReturn;
  const key = hash || text;
  if (cache.isFileChanged(key)) {
    result = parsePostOri(text);
    cache.set(key, result);
  } else {
    result = <ReturnType<typeof parsePostOri>>cache.get(key);
  }
  return result;
}

/**
 * Fix post body
 * * remove *.wp.com cdn
 * @param str
 */
export function fixPostBody(str: string) {
  // remote i2.wp.com i1.wp.com etc
  const regex = /https?:\/\/i\d{1,4}.wp.com\//gm;
  str = str.replace(regex, 'https://res.cloudinary.com/practicaldev/image/fetch/');
  // add notranslate
  if (!str.includes('document.querySelectorAll("pre,code")')) {
    const notranslate = `<script>document.querySelectorAll("pre,code");
  pretext.forEach(function (el) {
    el.classList.toggle("notranslate", true);
  });</script>`;
    str = str.replace(notranslate, '');
  }
  return str;
}

/**
 * Save Parsed Hexo markdown post
 * @param parsed return {@link parsePost}
 * @param file file path to save
 */
export function saveParsedPost(parsed: parsePostReturn, file: string) {
  if (!existsSync(dirname(file))) mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, buildPost(parsed));
}

/**
 * Rebuild {@link parsePost} result to markdown post back
 * @param parsed parsed post return {@link parsePost}
 * @returns
 */
export function buildPost(parsed: parsePostReturn) {
  return `---\n${yaml.stringify(parsed.metadata)}---\n\n${parsed.body}`;
}
