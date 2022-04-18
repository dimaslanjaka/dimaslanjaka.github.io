import { existsSync, mkdirSync } from 'fs-extra';
import { join } from 'upath';
import downloadImage from './download-image';

console.clear();
const tmp = join(__dirname, 'tmp');
if (!existsSync(tmp)) mkdirSync(tmp, { recursive: true });

// download to dir
const toDir = downloadImage('https://avatars.githubusercontent.com/u/32372333?v=4&s=160', tmp);
