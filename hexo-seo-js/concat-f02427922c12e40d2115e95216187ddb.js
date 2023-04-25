/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



/*--- /chimeraland/Pets/script.js --*/


document.addEventListener("DOMContentLoaded", function () {
  let table = new DataTable("table#pet-tree", {
    ajax: function (d, cb) {
      fetch("https://backend.webmanajemen.com/chimeraland/pets.php?json")
        .then((response) => response.json())
        .then((data) => {
          /**
           * @type {string[][]}
           **/
          const items = data.data;
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            /**
             * @type {string[]}
             **/
            const attr = item.attr;
            item.attr = attr
              .map((str) => {
                return `<li>${str}</li>`;
              })
              .join(" ");
            // switch icon quality
            let quality = item.qty;
            quality = quality.replace(
              /HP/gim,
              ' <img src="Pets/hp.webp" class="img-inline-text" title="Hit Points" />'
            );
            quality = quality.replace(
              /ATK/gim,
              '<img src="Recipes/attack.png" class="img-inline-text atk" title="Attack" /> '
            );
            quality = quality.replace(
              /DEF/gim,
              '<img src="Recipes/defense.png" class="img-inline-text def" title="Defense" /> '
            );
            quality = quality.replace(
              /GRADE A/gim,
              '<img src="Pets/grade-a.png" class="img-inline-text grade-a" title="Noble" /> '
            );
            quality = quality.replace(
              /GRADE B/gim,
              '<img src="Pets/grade-b.jpeg" class="img-inline-text grade-a" title="Grand" /> '
            );
            quality = quality.replace(
              /GRADE C/gim,
              '<img src="Pets/grade-c.png" class="img-inline-text grade-a" title="Rare" /> '
            );
            quality = quality.replace(
              /GRADE S/gim,
              '<img src="Pets/grade-s.png" class="img-inline-text grade-a" title="Illustrious" /> '
            );
            item.qty = quality;
          }
          data.data = items;
          document.querySelector("div#raw-data").remove();
          return cb(data);
        });
    },
    columns: [{ data: "name" }, { data: "qty" }, { data: "attr" }],
  });
});




/*--- inner-6 --*/


var disqus_config = function () { this.page.url = 'https://www.webmanajemen.com/chimeraland/Pets.html'; this.page.identifier = 'dimaslanjaka'; this.page.title = document.title; };



/*--- inner-7 --*/


(function() {var d = document, s = d.createElement('script');s.src = '//dimaslanjaka.disqus.com/embed.js';s.setAttribute('data-timestamp', +new Date());(d.head || d.body).appendChild(s);})();


