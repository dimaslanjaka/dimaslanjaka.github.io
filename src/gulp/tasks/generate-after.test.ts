import { filter_external_links } from './generate-after';

const urls = ['http://google.com', 'https://www.webmanajemen.com/page/about.html'];
urls.forEach((str) => {
  const filter = filter_external_links(str);
  console.log(filter);
});
