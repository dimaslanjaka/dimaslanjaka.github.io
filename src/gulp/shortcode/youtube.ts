import { theme_config } from '../../types/_config';

/* eslint-disable no-useless-escape */
const regex = /\{\%\s+youtube\s+(.*)\s+\%\}/gm;

export function shortcodeYoutube(content: string) {
  let m: RegExpExecArray;
  let count = 0;

  while ((m = regex.exec(content)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    count++;
    const ytid = m[1].split(',').map((s) => s.trim())[0];
    const allmatch = m[0];
    let html: string;
    if (theme_config.amp) {
      html = `<amp-youtube
      id="video-container-${count}"
      data-videoid="${ytid}"
      width="480"
      height="270"
      layout="responsive"
    >
      <amp-img
        src="https://img.youtube.com/vi/${ytid}/sddefault.jpg"
        placeholder
        layout="fill"
      />
    </amp-youtube>`;
    } else {
      // https://flaviocopes.com/responsive-youtube-videos/
      html = `<div class="video-container">
      <iframe src="https://www.youtube.com/embed/${ytid}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`;
    }
    content = content.replace(allmatch, () => html);
  }

  return content;
}
