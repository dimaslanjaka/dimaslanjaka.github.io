// add CNAME for github page custom domain
const fs = require('fs');
const path = require('path');

const domain = 'www.webmanajemen.com';
console.log(`Add CNAME (${domain})`);
const prodFolder = path.join(__dirname, '../docs');
if (!fs.existsSync(prodFolder)) fs.mkdirSync(prodFolder);
fs.writeFileSync(path.join(prodFolder, 'CNAME'), domain);
