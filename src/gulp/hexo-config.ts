import yaml from "yaml";
import { readFileSync } from "fs";
import path from "path";

export const root = path.join(__dirname, "../../");
export const config = yaml.parse(readFileSync(path.join(root, "_config.yml")).toString());
export const public_dir = path.join(root, config.public_dir);
export const source_dir = path.join(root, config.source_dir);
