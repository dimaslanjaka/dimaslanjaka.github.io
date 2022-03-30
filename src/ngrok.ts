import ngrokc from 'ngrok';
import { existsSync, join, normalize, readFileSync, write } from './node/filemanager';

/*
"token": "1Szs4cJp7MoUlFPT3nyRjD5P05v_3BREWhqf8z2NdcNHMneUm",
    "port": "4000"
 */

const fileNgrok = normalize(join(process.cwd(), 'build/ngrok.txt'));

/**
 * Get hosted ngrok base url
 */
export function getNgrokUrl() {
  if (existsSync(fileNgrok)) {
    return readFileSync(fileNgrok).toString('utf-8').trim();
  }
  return undefined;
}

/**
 * Ngrok connector
 * @param port default port 4000 based on HEXO
 * @param token ngrok port
 * @param override ngrok options override
 */
export default async (port = 4000, token = '', override: ngrokc.Ngrok.Options = {}) => {
  let options: ngrokc.Ngrok.Options = {
    addr: port,
  };
  if (token.length > 0) {
    options.authtoken = token;
  }
  options = Object.assign(options, override);

  const url = await ngrokc.connect(options);
  console.log(`Node.js local server is publicly-accessible at ${url}`);
  console.log(`url saved to ${fileNgrok}`);
  write(fileNgrok, url);
  return url;
};
