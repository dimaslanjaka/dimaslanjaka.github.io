import showdown from "showdown";
export const converterOpt = { strikethrough: true, tables: true, tablesHeaderId: true };

/**
 * Transform markdown string to html string
 * @param str
 */
export default function (str) {
  const converter = new showdown.Converter(converterOpt);
  return converter.makeHtml(str);
}
