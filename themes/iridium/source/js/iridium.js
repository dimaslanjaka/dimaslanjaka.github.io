/**
 * IRIDIUM JS Controller
 * * available for all layouts
 * @author <Dimas Lanjaka <dimaslanjaka@gmail.com>>
 */
(function () {
  const main = document.getElementById('main');
  ///// navbar controller
  const navs = document.querySelector('#nav');
  if (navs) {
    const cleanNavs = () => {
      // clean active class
      return Promise.resolve(navs.querySelectorAll('li').forEach((el) => el.classList.remove('active')));
    };
    navs.addEventListener(
      'mouseover',
      function (e) {
        const tn = e.target.tagName.toLowerCase();
        if (tn == 'li') cleanNavs().then(() => e.target.classList.add('active'));
        if (tn == 'a' && e.target.parentElement.tagName.toLowerCase() == 'li') cleanNavs().then(() => e.target.parentElement.classList.add('active'));
      },
      false
    );
  }

  ///// image controller
  function getImageMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
      callback(this.width, this.height);
    };
  }
  // lazy image resizer
  const indicators = {};
  document.addEventListener('scroll', function () {
    if (!indicators.images) {
      indicators.images = true;
      const images = main.querySelectorAll('img');
      if (images.length) {
        images.forEach((img) => {
          getImageMeta(img.src, function (width, height) {
            //console.log(width + 'px ' + height + 'px');
            //img.width = width + 'px';
            //img.height = height + 'px';
            img.setAttribute('width', width + 'px');
            //img.parentElement.replaceWith(img);
            img.setAttribute('height', height + 'px');
          });
        });
      }
    }
  });
})();
