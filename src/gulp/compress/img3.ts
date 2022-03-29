import minimatch from "minimatch";

export default function (files: string[]) {
  files.filter(function (path) {
    return minimatch(path, "**/*.{gif,jpg,png,svg,webp}", { nocase: true });
  });
}
