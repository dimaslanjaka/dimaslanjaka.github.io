import xmlbuilder from "xmlbuilder";
import GoogleNewsSitemap, { parse, root, XMLItemType } from ".";

const builder = new GoogleNewsSitemap();
builder.add({
  location: "http://example.com/article1",
  title: "item 1",
  publication_date: "May 24, 2012",
  publication_language: "en",
  publication_name: "Dimas Lanjaka",
});
builder.add({
  location: "http://example.com/article2",
  title: "item 2",
  publication_language: "en",
  publication_date: "May 25, 2012",
  publication_name: "Dimas Lanjaka",
});

builder.items.forEach((item) => {
  const prepare = {
    loc: item.loc,
    news: {
      publication: {
        name: item.news.publication.name,
        language: item.news.publication.language,
      },
      publication_date: item.news.publication_date,
      title: item.news.title,
    },
  };
  const build: XMLItemType = parse(prepare);
  build.loc = prepare.loc;
  root.urlset.url.push(build);
});

const xml = xmlbuilder.create(root, { version: "1.0", encoding: "UTF-8" }).end({ pretty: true });
console.log(xml);
