import { join, readFileSync, write } from './src/node/filemanager';
import yaml from 'yaml';
import { Hexo_Config } from './types/_config';

const file = join(__dirname, '_config.yml');
const str = readFileSync(file, 'utf-8');
const config: Hexo_Config = yaml.parse(str);
write(join(__dirname, 'types/_config.json'), JSON.stringify(config));
/**
 * Public Source Post Dir
 */
export const post_public_dir = join(__dirname, config.source_dir, '_posts');
/**
 * Generated directory
 */
export const post_generated_dir = join(__dirname, config.public_dir);
export const post_source_dir = join(__dirname, 'src-posts');
export default config;
