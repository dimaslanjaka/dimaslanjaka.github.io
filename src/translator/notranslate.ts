import parse from 'node-html-parser';

export default function (html: string) {
  const dom = parse(html);
  const pretext = dom.querySelectorAll('pre,code'); // NodeListOf<Element>
  pretext.forEach(function (el) {
    if (!el.classList.contains('notranslate')) el.classList.add('notranslate');
  });

  return dom.querySelector('body').innerHTML;
}
