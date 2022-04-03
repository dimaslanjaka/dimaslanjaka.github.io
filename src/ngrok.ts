import ngrokc from 'ngrok';
import { toUnix } from 'upath';
import { existsSync, readFileSync, write } from './node/filemanager';
import scheduler from './node/scheduler';
import { tmp } from './types/_config';

/*
"token": "1Szs4cJp7MoUlFPT3nyRjD5P05v_3BREWhqf8z2NdcNHMneUm",
    "port": "4000"
 */

const fileNgrok = toUnix(tmp('ngrok.txt'));

/**
 * Get hosted ngrok base url
 */
export function getNgrokUrl() {
  if (existsSync(fileNgrok)) {
    return readFileSync(fileNgrok).toString('utf-8').trim();
  }
}

/**
 * Ngrok connector
 * @param port default port 4000 based on HEXO
 * @param token ngrok port
 * @param override ngrok options override
 */
export default async function ngrokStart(port = 4000, token = '', override: ngrokc.Ngrok.Options = {}) {
  let options: ngrokc.Ngrok.Options = {
    addr: port,
  };
  if (token.length > 0) {
    options.authtoken = token;
  }
  options = Object.assign(options, override);

  const url = await ngrokc.connect(options);
  console.log(`[ngrok] Node.js local server is publicly-accessible at ${url}`);
  console.log(`[ngrok] url saved to ${fileNgrok}`);
  write(fileNgrok, url);
  scheduler.add('ngrok-kill', () => {
    ngrokc.kill();
  });
  return url;
}
