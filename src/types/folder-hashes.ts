import Bluebird from 'bluebird';
import { hashElement } from 'folder-hash';
import { join, write } from '../node/filemanager';
import { md5 } from '../node/md5-file';
import config, { post_source_dir, root } from './_config';

const options = {
  folders: {
    exclude: ['.*', 'node_modules', 'test_coverage', 'tmp', 'test', 'tests', '*.log', '*.test.ts', '*.test.js'],
  },
  files: { include: ['*.js', '*.ts', '*.md', '*.css', '*.scss', '*.less', '*.ejs', '*.html'] },
};

/**
 * Get src-posts hashes
 * @returns
 */
export async function get_src_posts_hash(): Promise<string | null> {
  try {
    const hash = await hashElement(post_source_dir, options);
    return md5(hash.toString());
  } catch (error) {
    console.error('hashing failed:', error);
  }
  return null;
}

/**
 * get folder hash of {@link config.source_dir}
 * @returns
 */
export async function get_source_hash() {
  try {
    //console.log(join(root, config.source_dir));
    const hash = await hashElement(join(root, config.source_dir), options);
    return md5(hash.toString());
  } catch (error) {
    console.error('hashing failed:', error);
  }
  return null;
}

// @todo generate folder hashes every called once
Bluebird.all([get_src_posts_hash(), get_source_hash()]).spread((src_posts, source) => {
  write(join(__dirname, '_config_hashes.json'), JSON.stringify({ 'src-posts': src_posts, source }));
});
