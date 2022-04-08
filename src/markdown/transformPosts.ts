/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { cwd, dirname, existsSync, mkdirSync, statSync, write, writeFileSync } from '../node/filemanager';
import yaml from 'yaml';
import { readFileSync } from 'fs';
import config_yml, { ProjectConfig, tmp } from '../types/_config';
import { replacePath } from '../gulp/tasks/copy';
import CacheFile from '../node/cache';
import ErrorMarkdown from './error-markdown';
import uuidv4 from '../node/uuid';
import moment from 'moment';
import { DynamicObject } from '../types';
import yargs from 'yargs';
import { toUnix } from 'upath';
import config from '../types/_config';
const argv = yargs(process.argv.slice(2)).argv;
const nocache = argv['nocache'];
const homepage = new URL(config.url);

export type parsePostReturn = DynamicObject & {
  /**
   * Article metadata
   */
  metadataString?: string;
  fileTree?: {
    /**
     * [post source] post file from `src-posts/`
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
  metadata?: DynamicObject & {
    /**
     * Article language code
     */
    lang?: string;
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
 * Parse Hexo markdown post (structured with yaml and universal markdown blocks)
 * * return metadata {string & object} and body
 * * return null == failed
 * * no cacheable
 * @param text file path or string markdown contents
 */
export function parsePostOri(text: string): parsePostReturn | null {
  const regexPost = /^---([\s\S]*?)---[\n\s\S]\n([\n\s\S]*)/gm;
  //const regex = /^---([\s\S]*?)---[\n\s\S]\n/gim;
  //let m: RegExpExecArray | { [Symbol.replace](string: string, replaceValue: string): string }[];
  /**
   * source file if `text` is file
   */
  const originalArg = text;
  const isFile = existsSync(text) && statSync(text).isFile();
  if (isFile) {
    text = readFileSync(text).toString();
  }

  const mapper = (m: RegExpMatchArray) => {
    let meta: parsePostReturn['metadata'] = yaml.parse(m[1]);
    let body = m[2];
    if (!body) body = 'no content ' + (meta.title || '');
    //write(tmp('parsePost', 'original.log'), body).then(console.log);
    if (!meta.uuid) {
      // assign uuid
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

    // default date post
    if (!meta.date) meta.date = moment().format();
    if (!meta.updated) {
      if (meta.modified) {
        // fix for hexo-blogger-xml
        meta.updated = meta.modified;
      } else {
        meta.updated = meta.date;
      }
    }

    if (!meta.comments) meta.comments = true;
    if (!meta.wordcount) meta.wordcount = null;

    // default excerpt/description
    if (meta.subtitle) {
      meta.excerpt = meta.subtitle;
      meta.description = meta.subtitle;
    }
    if (meta.description && !meta.excerpt) {
      meta.subtitle = meta.description;
      meta.excerpt = meta.description;
    }
    if (meta.excerpt && !meta.description) {
      meta.description = meta.excerpt;
      meta.subtitle = meta.excerpt;
    }
    if (isFile) {
      meta.permalink = toUnix(originalArg).replaceArr([cwd(), 'source/_posts/', 'src-posts/', '_posts/'], '/');
      homepage.pathname = meta.permalink;
      meta.url = homepage.toString();
    }
    const result: parsePostReturn = {
      metadata: meta,
      body: body,
      config: config_yml,
    };
    // put fileTree
    if (isFile) {
      result.fileTree = {
        source: replacePath(originalArg, '/source/_posts/', '/src-posts/'),
        public: replacePath(originalArg, '/src-posts/', '/source/_posts/'),
      };
    }
    return result;
  };

  // process parsing
  const testPost = Array.from(text.matchAll(regexPost)).map(mapper)[0];
  if (typeof testPost == 'object') return testPost;

  const regexPage = /^---([\s\S]*?)---[\n\s\S]([\n\s\S]*)/gm;
  const testPage = Array.from(text.matchAll(regexPage)).map(mapper)[0];
  return testPage;
}

/**
 * generate {@link parsePostReturn.fileTree}
 * @param source
 * @param parsed
 * @returns
 */
export function generateFileTree(source: string, parsed: parsePostReturn) {
  if (existsSync(source)) {
    if (parsed)
      parsed.fileTree = {
        source: replacePath(source, '/source/_posts/', '/src-posts/'),
        public: replacePath(source, '/src-posts/', '/source/_posts/'),
      };
  } else {
    //console.log('cannot generate file tree', parsed.metadata.title);
  }
  return parsed;
}

const parseCache = new CacheFile('parsePost');

/**
 * Cacheable parsePost
 * @param text file path or content markdown
 * @param hash set cache key if `text` isn't `file path`
 * @see {@link parsePostOri}
 * @returns
 */
export function parsePost(text: string, hash: string = null) {
  let result: ReturnType<typeof parsePostOri>;
  const key = hash || text;
  if (parseCache.isFileChanged(key) || !nocache) {
    // parse changed or no cache
    result = parsePostOri(text);
    //console.log('parse no cache', typeof result);
    parseCache.set(key, result);
  } else {
    // restore cache
    result = parseCache.get(key);
    if (typeof result == 'string') {
      try {
        result = JSON.parse(result);
      } catch (error) {
        const ef = tmp('parsePost.md');
        const em = new ErrorMarkdown({ argument: '```\n' + text + '\n```' });
        em.add('get', '```json\n' + JSON.stringify(result) + '\n```');
        write(ef, em.toString());
        throw new Error('fail parse post ' + ef);
      }
    }
  }

  return generateFileTree(text, result);
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
