import { rm } from 'fs';
import { TaskCallback } from 'undertaker';
import { join } from 'upath';
import { dbFolder } from '../../node/cache';
import config, { root, tmp } from '../../types/_config';

/** clean generated folder */
export const clean_public = (done?: TaskCallback) =>
  rm(join(root, config.public_dir), { recursive: true }, done);
/** clean posts from config.source_dir */
export const clean_posts = (done?: TaskCallback) =>
  rm(join(root, config.source_dir, '_posts'), { recursive: true }, done);
/** clean temp folder */
export const clean_tmp = (done?: TaskCallback) =>
  rm(tmp(), { recursive: true }, done);
/** clean database folder */
export const clean_db = (done?: TaskCallback) =>
  rm(dbFolder, { recursive: true }, done);
