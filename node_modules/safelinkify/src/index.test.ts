import { readFileSync, writeFileSync } from 'fs';
import { join } from 'upath';
import safelinkify from '.';

console.clear();
const options = {
  // exclude patterns (dont anonymize these patterns)
  exclude: [
    'domain.com',
    /another.domain.com/,
    /https?:\/\/?(?:([^*]+)\.)?webmanajemen\.com/,
    /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/
  ],
  // url redirector
  redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
  // debug
  verbose: false,
  // encryption type = 'base64' | 'aes'
  type: 'base64',
  // password aes, default = root
  password: 'unique-password'
};

const sf = new safelinkify.safelink(options);
const processedExternalLinks = sf.parse(`
<a href="www.example.com/page.php?id=xxxx&name=yyyy" ....>external</a>
<a href="http://www.example.com/page.php?id=xxxx&name=yyyy" ....>external</a>
<a href="https://www.example.com/page.php?id=xxxx&name=yyyy" ....>external</a>
<a href="www.example.com/page.php/404" ....></a>
<a href="http://external.domain.com">internal</a>
<a href="http://www.webmanajemen.com">internal</a>
<a href="http://webmanajemen.com">internal</a>
<a href="#http://webmanajemen.com">#internal</a>
<a href="?http://webmanajemen.com">?internal</a>
<a href="">internal</a>
`);
processedExternalLinks.then((result) => {
  writeFileSync(join(__dirname, 'test/processedExternalLinks.html'), result);
});

// parse from file
const readFromFile = readFileSync(join(__dirname, 'test/index.html')).toString();
if (typeof readFromFile == 'string' && readFromFile) {
  const parseFromFile = sf.parse(readFromFile);
  if (typeof parseFromFile == 'string' && parseFromFile)
    writeFileSync(join(__dirname, 'test/index.safelinkify.html'), parseFromFile);
}
