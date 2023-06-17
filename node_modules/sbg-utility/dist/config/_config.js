"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectIgnores = exports.commonIgnore = exports.deployConfig = exports.getConfig = exports.setConfig = exports.fetchConfig = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const upath_1 = require("upath");
const yaml_1 = tslib_1.__importDefault(require("yaml"));
const utils = tslib_1.__importStar(require("../utils"));
const defaults = tslib_1.__importStar(require("./defaults"));
const configFileJSON = (0, upath_1.join)(__dirname, '_config.json');
if (!fs_extra_1.default.existsSync(configFileJSON))
    fs_extra_1.default.writeFileSync(configFileJSON, '{}');
let settledConfig = defaults.getDefaultConfig();
/**
 * find `_config.yml`
 * @param fileYML path to file `_config.yml` or working directory
 */
function fetchConfig(fileYML) {
    if (!fileYML) {
        fileYML = (0, upath_1.join)(process.cwd(), '_config.yml');
    }
    else if (!fileYML.endsWith('_config.yml')) {
        fileYML += '/_config.yml';
    }
    const configYML = yaml_1.default.parse(fs_extra_1.default.readFileSync((0, upath_1.resolve)(fileYML), 'utf-8'));
    setConfig(utils.object.orderKeys(configYML));
    utils.filemanager.writefile(configFileJSON, JSON.stringify(configYML, null, 2));
}
exports.fetchConfig = fetchConfig;
// fetch _config.yml first init
// fetchConfig(join(process.cwd(), '_config.yml'));
/**
 * Config setter
 * * useful for jest
 * @param obj
 */
function setConfig(obj) {
    settledConfig = Object.assign(settledConfig || {}, obj);
    return getConfig();
}
exports.setConfig = setConfig;
/**
 * Config getter
 * * useful for jest
 * @returns
 */
function getConfig() {
    settledConfig.deploy = Object.assign(settledConfig.deploy || {}, deployConfig());
    return settledConfig;
}
exports.getConfig = getConfig;
/**
 * get deployment config
 * @returns
 */
function deployConfig() {
    let deployDir;
    if (settledConfig.deploy_dir) {
        // deploy_dir was set
        deployDir = settledConfig.deploy_dir;
    }
    else {
        // fallback get from deploy.type
        deployDir = (0, upath_1.join)(settledConfig.cwd, '.deploy_' + settledConfig.deploy?.type || 'git');
    }
    // subfolder - assign deploy.folder
    if (settledConfig.deploy.folder) {
        deployDir = (0, upath_1.join)(deployDir, settledConfig.folder);
    }
    return { deployDir };
}
exports.deployConfig = deployConfig;
/**
 * common ignore files
 * @example
 * const config = getConfig();
 * const excludes = Array.isArray(config.exclude) ? config.exclude : [];
 * excludes.push(...commonIgnore);
 */
exports.commonIgnore = [
    '**/yandex_*.html',
    // '**/comments.html',
    // '**/disqus-comments.html',
    // '**/comment.html', // skip comment.html
    '**/favicon.html',
    '**/404.html',
    '**/node_modules/**',
    '**/tmp/**',
    '**/build/**',
    '**/.cache/**',
    '**/.vscode/**',
    '**/.frontmatter/**',
    '**/pinterest-*.html',
    '**/_*.standalone.{js,ts}',
    '**/desktop.ini',
    '**/node_modules/**',
    '**/.frontmatter/**',
    '**/.git*/**',
    '**/.*' // skip dots
];
/**
 * array of config.exclude, config.ignore
 */
exports.projectIgnores = [...(getConfig().skip_render || []), ...(getConfig().ignore || [])];
//# sourceMappingURL=_config.js.map