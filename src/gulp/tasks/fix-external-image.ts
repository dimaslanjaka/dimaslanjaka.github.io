import { curly } from 'node-libcurl';
import http from 'http';

const src = 'https://aws1.discourse-cdn.com/meteor/optimized/2X/e/ef0ba7cbf2b6749fe0220f6ed973027c4c61b251_2_690x362.png';
const options: http.RequestOptions = new URL(src);
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});
