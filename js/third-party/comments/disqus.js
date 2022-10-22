/* eslint-disable no-unused-vars */
/* global NexT, CONFIG, DISQUS */

document.addEventListener('page:loaded', () => {
  if (CONFIG.disqus.count) {
    const loadCount = () => {
      NexT.utils.getScript(
        `https://${CONFIG.disqus.shortname}.disqus.com/count.js`,
        {
          attributes: { id: 'dsq-count-scr' }
        }
      );
    };

    // defer loading until the whole page loading is completed
    window.addEventListener('load', loadCount, false);
  }
  if (CONFIG.page.comments) {
    const pageUrl = CONFIG.page.permalink.replace(/%20/g, ' ');
    const frame = document.createElement('iframe');
    frame.src = '/page/disqus-comment.html?url=' + pageUrl;
    frame.setAttribute('data-timestamp', +new Date());
    frame.id = 'disqus-frame';
    frame.setAttribute('frameborder', 0);
    frame.setAttribute('style', 'width:100%;min-height:500px;');
    document.getElementById('disqus_thread').appendChild(frame);

    window.addEventListener(
      'message',
      (event) => {
        if (/webmanajemen\.com|^localhost/i.test(event.origin)) {
          const data = event.data;
          if (typeof data === 'object') {
            if ('type' in data) {
              if (data.type === 'embed-size') {
                document.getElementById('disqus-frame').height = data.height;
              }
            }
          }
        }
      },
      false
    );

    /*
    // `disqus_config` should be a global variable
    // See https://help.disqus.com/en/articles/1717084-javascript-configuration-variables
    window.disqus_config = function() {
      this.page.url = CONFIG.page.permalink.replace(/%20/g, ' ');
      this.page.identifier = decodeURIComponent(CONFIG.page.path);
      this.page.title = CONFIG.page.title || document.title;
      if (CONFIG.disqus.i18n.disqus !== 'disqus') {
        this.language = CONFIG.disqus.i18n.disqus;
      }
      return this.page;
    };
    NexT.utils.loadComments('#disqus_thread').then(() => {
      if (window.DISQUS) {
        DISQUS.reset({
          reload: true,
          config: window.disqus_config
        });
      } else {
        NexT.utils.getScript(
          `https://${CONFIG.disqus.shortname}.disqus.com/embed.js`,
          {
            attributes: { dataset: { timestamp: '' + +new Date() } }
          }
        );
      }
    });
    */
  }
});
