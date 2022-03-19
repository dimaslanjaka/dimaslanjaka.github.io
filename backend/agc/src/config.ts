import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import * as YAML from 'yaml';
import hexo_config_type from './hexo_config.json';
export const hexo_config_file = join(__dirname, '../../../../_config.yml');
const config = {
  temp_dir: join(__dirname, '../tmp'),
  /**
   * Save as backend for translation
   */
  public_dir: join(__dirname, '../public'),
  hexo_config_file: hexo_config_file,
  hexo_config: hexo_config_type,
  hexo_post_dir: join(dirname(hexo_config_file), hexo_config_type.public_dir, '_posts'),
};
config.hexo_config = YAML.parse(readFileSync(config.hexo_config_file, 'utf8'));
writeFileSync(join(__dirname, 'hexo_config.json'), JSON.stringify(config.hexo_config));

export default config;
