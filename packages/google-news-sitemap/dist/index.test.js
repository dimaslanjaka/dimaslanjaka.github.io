"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var xmlbuilder_1 = tslib_1.__importDefault(require("xmlbuilder"));
var _1 = tslib_1.__importStar(require("."));
var builder = new _1.default();
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
builder.items.forEach(function (item) {
    var prepare = {
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
    var build = (0, _1.parse)(prepare);
    build.loc = prepare.loc;
    _1.root.urlset.url.push(build);
});
var xml = xmlbuilder_1.default.create(_1.root, { version: "1.0", encoding: "UTF-8" }).end({ pretty: true });
console.log(xml);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtFQUFvQztBQUNwQyw0Q0FBZ0U7QUFFaEUsSUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFpQixFQUFFLENBQUM7QUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUNWLFFBQVEsRUFBRSw2QkFBNkI7SUFDdkMsS0FBSyxFQUFFLFFBQVE7SUFDZixnQkFBZ0IsRUFBRSxjQUFjO0lBQ2hDLG9CQUFvQixFQUFFLElBQUk7SUFDMUIsZ0JBQWdCLEVBQUUsZUFBZTtDQUNsQyxDQUFDLENBQUM7QUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQ1YsUUFBUSxFQUFFLDZCQUE2QjtJQUN2QyxLQUFLLEVBQUUsUUFBUTtJQUNmLG9CQUFvQixFQUFFLElBQUk7SUFDMUIsZ0JBQWdCLEVBQUUsY0FBYztJQUNoQyxnQkFBZ0IsRUFBRSxlQUFlO0NBQ2xDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtJQUN6QixJQUFNLE9BQU8sR0FBRztRQUNkLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztRQUNiLElBQUksRUFBRTtZQUNKLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDaEMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDekM7WUFDRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtZQUM1QyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1NBQ3ZCO0tBQ0YsQ0FBQztJQUNGLElBQU0sS0FBSyxHQUFnQixJQUFBLFFBQUssRUFBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDeEIsT0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBTSxHQUFHLEdBQUcsb0JBQVUsQ0FBQyxNQUFNLENBQUMsT0FBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNqRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDIn0=