import request from 'request';
import JSONStream from 'JSONStream';
import es from 'event-stream';
import { root } from '../types/_config';
import { join } from 'upath';
import { createReadStream, existsSync } from 'fs';
import v8, { deserialize, serialize } from 'v8';
import { readFileSync } from '../node/filemanager';

console.clear();
const target = join(root, 'databases', 'db-modifyPost.json');
// Calling v8.serialize()
const serialized_data = v8.serialize('abcdefg');
console.log(serialized_data);
console.log(v8.deserialize(serialized_data));

function fromfile() {
  const target = join(root, 'databases', 'db-modifyPost.json');
  if (existsSync(target)) {
    const parser = JSONStream.parse();
    createReadStream(target, { encoding: 'utf8' }).pipe(parser);
    parser.on('root', function (obj) {
      console.log(obj); // whatever you will do with each JSON object
    });
  }
}

function fromurl() {
  request({ url: 'https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json' })
    .pipe(JSONStream.parse('*'))
    .pipe(
      es.mapSync(function (data) {
        console.error(data);
        return data;
      })
    );
}
