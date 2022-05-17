/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function nodeListOf2Html(nodes: NodeListOf<Element>) {
  return Array.prototype.reduce.call(
    nodes,
    function (html, node) {
      return html + (node.outerHTML || node.nodeValue);
    },
    ''
  );
}
