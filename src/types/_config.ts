import { cwd, existsSync, join, mkdirSync, read, readFileSync, resolve, write } from '../node/filemanager';
import yaml from 'yaml';
import project_config_data from './_config_project.json';
import theme_config_data from './_config_theme.json';
import { toUnix } from 'upath';
import gulp from 'gulp';
import yargs from 'yargs';
import { initializeApp } from 'firebase/app';
import { Ngrok } from 'ngrok';

const argv = yargs(process.argv.slice(2)).argv;

export const root = join(__dirname, '../../');
const file = join(root, '_config.yml');
const readConfig = readFileSync(file, 'utf-8');
/** default project config */
const def_config = {
  verbose: argv['verbose'], // if set = true, otherwise undefined
  exclude: [],
  include: [],
  skip_render: [],
  ignore: [],
  adsense: {
    article_ads: [],
  },
  firebase: {
    apiKey: null,
    authDomain: null,
    projectId: null,
    storageBucket: null,
    messagingSenderId: null,
    appId: null,
    measurementId: null,
  },
  ngrok: {
    token: null,
  },
  generator: {
    cache: argv['nocache'], // if set = true, otherwise undefined
  },
};

const project_config_merge = Object.assign(def_config, yaml.parse(readConfig));
if (project_config_merge.adsense.enable) {
  const findads = (path: string) => {
    let findpath = join(cwd(), path);
    if (!existsSync(findpath)) {
      findpath = join(root, path);
    }
    if (existsSync(findpath)) return String(read(findpath));
  };
  if (project_config_merge.adsense.article_ads.length) {
    project_config_merge.adsense.article_ads = project_config_merge.adsense.article_ads.map(findads);
  }
  if (project_config_merge.adsense.multiplex_ads.length) {
    project_config_merge.adsense.multiplex_ads = project_config_merge.adsense.multiplex_ads.map(findads);
  }
}
// @todo [config] bypass nocache if --nocache argument is set by cli
if (def_config.generator.cache) project_config_merge.generator.cache = def_config.generator.cache;

type projectImportData = typeof project_config_data;
interface PrivateProjectConfig {
  [keys: string]: any;
  firebase: Parameters<typeof initializeApp>[0];
  ngrok: Ngrok.Options;
  root: string;
  tmp: typeof tmp;
}

export type ProjectConfig = projectImportData & PrivateProjectConfig;

const config: ProjectConfig = project_config_merge;

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

/** THEME CONFIGS */
/** theme directory */
export const theme_dir = toUnix(resolve(join(root, 'themes', config.theme)));
/** _config.yml object from theme directory */
export const theme_yml = join(theme_dir, '_config.yml');
/** merged theme config object */
export const theme_config = Object.assign(
  theme_config_data,
  existsSync(theme_yml) ? yaml.parse(readFileSync(theme_yml, 'utf-8')) : {}
);
export type ThemeOpt = typeof theme_config & {
  [key: string]: any;
};

gulp.task('log:config', async () => {
  const f = await write(tmp('config.json'), {
    project: config,
    theme: theme_config,
  });
  return console.log('[log]', 'config', f);
});

/** WRITE AUTO GENERATED CONFIGS */

write(join(__dirname, '_config_project.json'), JSON.stringify(config));
write(join(__dirname, '_config_theme.json'), JSON.stringify(theme_config));

/** SETUP PRIVATE CONFIGS */
const file_private_config = join(root, '_config.private.yml');
if (existsSync(file_private_config)) {
  const privateConfig: PrivateProjectConfig = yaml.parse(readFileSync(file_private_config, 'utf-8'));
  if (Object.hasOwnProperty.call(privateConfig, 'firebase')) {
    config.firebase = <any>privateConfig.firebase;
  }
}

config.root = root;
config.tmp = tmp;

/** EXPORT PRIVATE AND PUBLIC CONFIGS */

export default config;
