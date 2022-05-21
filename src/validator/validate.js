// validate public_dir
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '/../');
const docs = path.join(root, 'docs');

// if public_dir/index.html empty, throw
const tests = [
  path.join(docs, 'index.html'),
  path.join(docs, 'The Legend Of Neverland/Quiz.html')
];
tests.forEach(function (test) {
  if (fs.existsSync(test)) {
    const sizes_byte = fs.statSync(test).size;
    if (sizes_byte === 0) throw `File size ${test} 0`;
    const content_sizes = fs.readFileSync(test).toString().trim().length;
    if (content_sizes === 0) throw `File content empty ${test}`;
  }
});
