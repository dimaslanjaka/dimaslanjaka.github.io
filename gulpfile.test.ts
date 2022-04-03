import { curly } from "node-libcurl";

(async () => {
  curly
    .get(
      "https://res.cloudinary.com/dimaslanjaka/image/fetch/https://i2.wp.com/www.dramaencode.com/wp-content/uploads/2018/10/Happy-Together-Season-4-Subtitle-Indonesia.jpg?resize=300,300&ssl=1"
    )
    .then((res) => {
      console.log(res.statusCode, res.headers[0]["content-type"]);
    })
    .catch(console.error);
})();
