import { hashElement } from 'folder-hash';
import { cwd, join, write } from '../node/filemanager';
import { md5 } from '../node/md5-file';

let src_posts: string;
const options = {
  folders: { exclude: ['.*', 'node_modules', 'test_coverage', 'tmp'] },
  files: { include: ['*.js', '*.ts', '*.md', '*.css'] },
};

export async function get_src_posts_hash() {
  try {
    const hash = await hashElement(join(cwd(), 'src-posts'), options);
    src_posts = md5(hash.toString());
    return src_posts;
  } catch (error) {
    console.error('hashing failed:', error);
  }
}

get_src_posts_hash().then(() => {
  write(join(__dirname, '_config_hashes.json'), JSON.stringify({ src_posts }));
});
