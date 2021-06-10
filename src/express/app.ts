// app.js
import express from "express";
import path from "path";
import serveIndex from "serve-index";
import serveStatic from "serve-static";
import { default as translateRouter } from "./routes/translate";
import ngrok from "../ngrok";
import session from "express-session";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Storage from "../js/Storage";
import expressLayouts from "./express-layouts";
const storage = new Storage();

let port = 3000;
ngrok(port).then((url) => {
  // save ngrok url to storage
  storage.set("ngrok", url);
});

const app = express();

// set views folder
app.set("views", path.resolve("src/views"));
app.set("view engine", "hbs");

// set layout configuration
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.use(expressLayouts);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

// prepare session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// serve static build/_posts
app.use("/", express.static("build/_posts"), serveIndex("build/_posts", { icons: true }));
app.use(serveStatic(path.join(__dirname, "views")));

// router start
app.use("/translate", translateRouter);

app.listen(port);

exports.app = app;
module.exports.app = app;
export default app;
