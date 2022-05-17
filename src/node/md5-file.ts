import crypto from 'crypto';
import fs from 'fs';

export function md5FileSync(path: string) {
  let fileBuffer: Buffer = Buffer.from(path);
  if (fs.existsSync(path)) {
    fileBuffer = fs.readFileSync(path);
  }
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

/**
 * PHP MD5 Equivalent
 * @param data
 * @returns
 */
export function md5(data: string) {
  return crypto.createHash('md5').update(data).digest('hex');
}

export default function md5File(path: string) {
  return new Promise((resolve, reject) => {
    const output = crypto.createHash('md5');
    const input = fs.createReadStream(path);

    input.on('error', (err) => {
      reject(err);
    });

    output.once('readable', () => {
      resolve(output.read().toString('hex'));
    });

    input.pipe(output);
  });
}
