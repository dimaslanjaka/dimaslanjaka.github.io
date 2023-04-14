/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



/*--- /js/common.js --*/


window.$claudia = {
    throttle: function (func, time) {
        var wait = false
        return function () {
            if (wait) return
            wait = true

            setTimeout(function () {
                func()
                wait = false
            }, time || 100)
        }
    },
    fadeInImage: function(imgs, imageLoadedCallback) {
        var images = imgs || document.querySelectorAll('.js-img-fadeIn')

        function loaded(event) {
            var image = event.currentTarget

            image.ontransitionend = function () {
                image.ontransitionend = null
                image.style.transition = null
            }
            image.style.transition = 'opacity 320ms'
            image.style.opacity = 1

            if (image.parentElement && image.parentElement.classList.contains('skeleton')) {
                image.parentElement.classList.remove('skeleton')
            }
            imageLoadedCallback && imageLoadedCallback(image)
        }

        images.forEach(function (img) {
            if (img.complete) {
                return loaded({ currentTarget: img })
            }

            img.addEventListener('load', loaded)
        })
    },
    blurBackdropImg: function(image) {
        if (!image.dataset.backdrop) return

        var parent = image.parentElement //TODO: Not finish yes, must be a pure function
        var parentWidth = Math.round(parent.getBoundingClientRect().width)
        var childImgWidth = Math.round(image.getBoundingClientRect().width)

        var isCovered = parentWidth === childImgWidth
        var blurImg = parent.previousElementSibling //TODO: Not finish yes, must be a pure function

        isCovered ? blurImg.classList.add('is-hidden') : blurImg.classList.remove('is-hidden')
    },
    getSystemTheme(callback) {
        var media = window.matchMedia('(prefers-color-scheme: dark)')
        media.addEventListener('change', function (e){
            callback && callback(e.matches ? "dark" : "light")
        })

        callback && callback(media.matches ? 'dark' : 'light')
    }
}




/*--- inner-2 --*/



  let url = location.href;

  let redirect = false;
  if (url.includes('/Chimeraland')) {
    url = url.replace('/Chimeraland', '/chimeraland');
    redirect = true;
  }
  if (url.includes('/Monsters')) {
    url = url.replace('/Monsters', '/monsters');
    redirect = true;
  }
  if (url.includes('/Attendants')) {
    url = url.replace('/Attendants', '/attendants');
    redirect = true;
  }
  if (url.endsWith('/Recipes.html')) {
    url = url.replace('/Recipes.html', '/recipes.html');
    redirect = true;
  }
  if (url.includes('/Recipes/')) {
    url = url.replace('/Recipes/', '/recipes/');
    redirect = true;
  }

  function redir(url) {
    try {
      window.location.href(url);
    } catch (_e) {
      try {
        location.href(url);
      } catch (__e) {
        try {
          location.replace(url);
        } catch(___e) {
          window.location = url;
        }
      }
    }
  }

  if (redirect) {
    alert(`url migrated and redirecting to ${url}`);
    redir(url);
    document.head.innerHTML += `<link rel="canonical" href="${url}" />`;
  }



