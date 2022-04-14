import { existsSync, join, mkdirSync, readFileSync, resolve, write } from '../node/filemanager';
import yaml from 'yaml';
import project_config_data from './_config_project.json';
import theme_config_data from './_config_theme.json';
import { toUnix } from 'upath';
import { hostname } from 'os';

export const root = join(__dirname, '../../');
const file = join(root, '_config.yml');
const str = readFileSync(file, 'utf-8');
const def_config = {
  verbose: false,
  exclude: [],
  include: [],
  skip_render: [],
  ignore: [],
};

const project_config_merge = Object.assign(def_config, yaml.parse(str) as typeof project_config_data);
export type ProjectConfig = typeof project_config_merge & {
  [keys: string]: any;
};
const config: ProjectConfig = project_config_merge;

if (process.env.NODE_ENV == 'development') {
  // just change proxy localhost name to my localhost
  // just run on my computer
  if (hostname() == 'HP-14-bs0xx') config.url = 'http://adsense.webmanajemen.com:' + config.server.port;
}

config.url = config.url.replace(/\/+$/, '');

/**
 * Public Source Post Dir (`source/_posts`)
 */
export const post_public_dir = resolve(join(root, config.source_dir, '_posts'));
/**
 * Generated directory (`config.public_dir`)
 */
export const post_generated_dir = resolve(join(root, config.public_dir));
/**
 * `src-posts/` directory
 */
export const post_source_dir = resolve(join(root, 'src-posts'));
/**
 * path to temp folder
 * @param path file path inside temp folder
 * @returns
 */
export const tmp = (...path: string[]) => join(root, 'tmp', path.join('/'));
if (!existsSync(tmp())) mkdirSync(tmp());

//// THEME
export const theme_dir = toUnix(resolve(join(root, 'themes', config.theme)));
export const theme_yml = join(theme_dir, '_config.yml');
export const theme_config = Object.assign(theme_config_data, existsSync(theme_yml) ? yaml.parse(readFileSync(theme_yml, 'utf-8')) : {});
export type ThemeOpt = typeof theme_config & {
  [key: string]: any;
};

export default config;

write(join(__dirname, '_config_project.json'), JSON.stringify(config));
write(join(__dirname, '_config_theme.json'), JSON.stringify(theme_config));
