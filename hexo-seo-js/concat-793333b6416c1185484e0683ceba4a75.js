/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



/*--- inner-3 --*/



window.location.href = 'https://www.webmanajemen.com/chimeraland/recipes.html';




/*--- inner-4 --*/



  function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'auto' }, 'google_translate_element');
  }
  function restoreLang() {
    var iframe = document.getElementsByClassName('goog-te-banner-frame')[0];
    if (!iframe) return;

    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var restore_el = innerDoc.getElementsByTagName("button");

    for (var i = 0; i < restore_el.length; i++) {
      if (restore_el[i].id.indexOf("restore") >= 0) {
        restore_el[i].click();
        var close_el = innerDoc.getElementsByClassName("goog-close-link");
        close_el[0].click();
        return;
      }
    }
  }




/*--- inner-6 --*/



  (adsbygoogle = window.adsbygoogle || []).push({});




/*--- inner-10 --*/



  document.addEventListener("DOMContentLoaded", function () {
    fetch("https://backend.webmanajemen.com/chimeraland/recipes.php?json")
      .then((response) => response.json())
      .then((data) => {
        /**
         * @type {string[]}
         **/
        const recipes = data.data;
        const table = document.querySelector("table#recipes");
        const tbody = table.querySelector("tbody");
        for (let index = 0; index < recipes.length; index++) {
          const recipe = recipes[index];
          let facility = recipe[2]
            .split(/\s/gim)
            .map((str, index) => {
              //console.log(str, index);
              if (index === 1 && str.startsWith('i')) {
                return str.toUpperCase();
              }
              return str.charAt(0).toUpperCase() + str.slice(1);
            })
            .join(" ");
          const tr = `<tr><td>${recipe[0]}</td> <td>${recipe[1]}</td> <td>${facility}</td> <td>${recipe[3]}</td> <td>${recipe[4]}</td> <td>${recipe[5]}</td></tr>`;
          tbody.innerHTML += tr;
        }
        return data;
      })
      .then((data) => {
        let table = new DataTable("table#recipes", { responsive: true, });
      }, 4000);
  });




/*--- inner-12 --*/


var disqus_config = function () { this.page.url = 'https://www.webmanajemen.com/chimeraland/Recipes-list.html'; this.page.identifier = 'dimaslanjaka'; this.page.title = document.title; };



/*--- inner-13 --*/


(function() {var d = document, s = d.createElement('script');s.src = '//dimaslanjaka.disqus.com/embed.js';s.setAttribute('data-timestamp', +new Date());(d.head || d.body).appendChild(s);})();


