"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.root = void 0;
var tslib_1 = require("tslib");
var moment_1 = tslib_1.__importDefault(require("moment"));
var xmlbuilder_1 = tslib_1.__importDefault(require("xmlbuilder"));
exports.root = {
    urlset: {
        "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "@xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9",
        "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "@xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd",
        url: [],
    },
};
var genres = ["Blog", "OpEd", "Opinion", "PressRelease", "Satire", "UserGenerated"];
function parse(prepare) {
    return {
        loc: prepare.loc,
        "news:news": {
            "news:publication": {
                "news:language": prepare.news.publication.language,
                "news:name": prepare.news.publication.name,
            },
            "news:title": prepare.news.title,
            "news:publication_date": prepare.news.publication_date,
        },
    };
}
exports.parse = parse;
var GoogleNewsSitemap = /** @class */ (function () {
    function GoogleNewsSitemap() {
        /**
         * Max 1000 items
         */
        this.items = [];
    }
    GoogleNewsSitemap.prototype.add = function (item) {
        if (!item.title && !item.publication_name && item.publication_date)
            return;
        var author = "Dimas Lanjaka (Default User)";
        if (typeof item.publication_name == "string") {
            author = item.publication_name;
        }
        else if (typeof item.publication_name == 'object') {
            if (item.publication_name.name)
                author = item.publication_name.name;
        }
        var build = {
            loc: item.location,
            news: {
                publication: { name: author, language: item.publication_language || "en" },
                publication_date: item.publication_date || (0, moment_1.default)(new Date(), moment_1.default.ISO_8601).format(GoogleNewsSitemap.date_pattern),
                title: item.title,
                genres: item.genres || "Blog",
            },
        };
        if (typeof item.keywords == "string") {
            build.news.keywords = item.keywords;
        }
        else if (Array.isArray(item.keywords)) {
            build.news.keywords = item.keywords.join(",");
        }
        exports.root.urlset.url.push(parse(build));
        this.items.push(build);
        return build;
    };
    GoogleNewsSitemap.prototype.getTotal = function () {
        return this.items.length;
    };
    GoogleNewsSitemap.prototype.toString = function () {
        return xmlbuilder_1.default.create(exports.root, { version: "1.0", encoding: "UTF-8" }).end({ pretty: true });
    };
    GoogleNewsSitemap.date_pattern = "YYYY-MM-DDTHH:mm:ssZ";
    return GoogleNewsSitemap;
}());
exports.default = GoogleNewsSitemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUE0QjtBQUM1QixrRUFBb0M7QUFHdkIsUUFBQSxJQUFJLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLDZDQUE2QztRQUN2RCxhQUFhLEVBQUUsZ0RBQWdEO1FBQy9ELFlBQVksRUFBRSwyQ0FBMkM7UUFDekQscUJBQXFCLEVBQ25CLG9OQUFvTjtRQUN0TixHQUFHLEVBQUUsRUFBRTtLQUNSO0NBQ0YsQ0FBQztBQUdGLElBQU0sTUFBTSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQVUsQ0FBQztBQStCL0YsU0FBZ0IsS0FBSyxDQUFDLE9BQWlCO0lBQ3JDLE9BQU87UUFDTCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7UUFDaEIsV0FBVyxFQUFFO1lBQ1gsa0JBQWtCLEVBQUU7Z0JBQ2xCLGVBQWUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO2dCQUNsRCxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTthQUMzQztZQUNELFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDaEMsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7U0FDdkQ7S0FDRixDQUFDO0FBQ0osQ0FBQztBQVpELHNCQVlDO0FBa0REO0lBQUE7UUFDRTs7V0FFRztRQUNILFVBQUssR0FBZSxFQUFFLENBQUM7SUFtQ3pCLENBQUM7SUFqQ0MsK0JBQUcsR0FBSCxVQUFJLElBQW1CO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0I7WUFBRSxPQUFPO1FBQzNFLElBQUksTUFBTSxHQUFHLDhCQUE4QixDQUFDO1FBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLElBQUksUUFBUSxFQUFFO1lBQzVDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDaEM7YUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixJQUFJLFFBQVEsRUFBRTtZQUNuRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJO2dCQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1NBQ3JFO1FBQ0QsSUFBTSxLQUFLLEdBQWE7WUFDdEIsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ2xCLElBQUksRUFBRTtnQkFDSixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLElBQUksSUFBSSxFQUFFO2dCQUMxRSxnQkFBZ0IsRUFDZCxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBQSxnQkFBTSxFQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO2dCQUNyRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU07YUFDOUI7U0FDRixDQUFDO1FBQ0YsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDckM7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFtQixJQUFJLENBQUMsUUFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoRTtRQUNELFlBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxvQ0FBUSxHQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtJQUMxQixDQUFDO0lBQ0Qsb0NBQVEsR0FBUjtRQUNFLE9BQU8sb0JBQVUsQ0FBQyxNQUFNLENBQUMsWUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBakNNLDhCQUFZLEdBQUcsc0JBQXNCLENBQUM7SUFrQy9DLHdCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7a0JBdkNvQixpQkFBaUIifQ==