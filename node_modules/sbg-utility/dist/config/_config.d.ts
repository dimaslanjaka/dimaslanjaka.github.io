import Hexo from 'hexo';
import * as defaults from './defaults';
export type HexoConfig = Hexo['config'];
export interface ProjConf extends HexoConfig {
    [key: string]: any;
    /**
     * Source posts
     */
    post_dir: string;
    /**
     * deployment directory (can be absolute path)
     * @example
     * \<project\>/.deploy_git
     * ```yaml
     * deploy_dir: .deploy_git
     * ```
     * at somewhere on your pc
     * ```yaml
     * deploy_dir: '/usr/home/site/my username'
     * ```
     */
    deploy_dir: string;
    /**
     * Project CWD
     */
    cwd: string;
    /**
     * Deployment options
     */
    deploy: HexoConfig['deploy'] & defaults.importConfig['deploy'] & ReturnType<typeof deployConfig> & {
        /**
         * copy to subfolder of site
         * @example
         * deployment location at \<project\>/.deploy_git/docs
         * ```yaml
         * deploy_dir: .deploy_git
         * deploy:
         *  folder: docs
         * ```
         */
        folder?: string;
    };
    external_link: HexoConfig['external_link'] & defaults.importConfig['external_link'] & boolean & {
        safelink?: import('safelinkify').SafelinkOptions;
    };
    /**
     * global ignore
     */
    exclude: string[];
    generator: {
        [key: string]: any;
        cache: boolean;
        verbose: boolean;
    };
    /**
     * Tags mapper
     */
    tags?: LabelMapper;
    /**
     * Categories mapper
     */
    categories?: LabelMapper;
}
export interface LabelMapper {
    /**
     * turn label to lower case
     */
    lowercase: boolean;
    /**
     * add old label with new label
     */
    assign: Record<string, string> | undefined | null;
    /**
     * replace old label with new label
     */
    mapper: Record<string, string> | undefined | null;
}
/**
 * find `_config.yml`
 * @param fileYML path to file `_config.yml` or working directory
 */
export declare function fetchConfig(fileYML?: string): void;
/**
 * Config setter
 * * useful for jest
 * @param obj
 */
export declare function setConfig(obj: Record<string, any> | ProjConf): ProjConf;
/**
 * Config getter
 * * useful for jest
 * @returns
 */
export declare function getConfig(): ProjConf;
/**
 * get deployment config
 * @returns
 */
export declare function deployConfig(): {
    deployDir: string;
};
/**
 * common ignore files
 * @example
 * const config = getConfig();
 * const excludes = Array.isArray(config.exclude) ? config.exclude : [];
 * excludes.push(...commonIgnore);
 */
export declare const commonIgnore: string[];
/**
 * array of config.exclude, config.ignore
 */
export declare const projectIgnores: any[];
