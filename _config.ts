import { join, readFileSync, write } from "./src/node/filemanager";
import yaml from "yaml";
import { Hexo_Config } from "./types/_config";

const file = join(__dirname, "_config.yml");
const str = readFileSync(file, "utf-8");
const config: object = yaml.parse(str);
write(join(__dirname, "types/_config.json"), JSON.stringify(config));
export default config as Hexo_Config;
