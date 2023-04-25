/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



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



