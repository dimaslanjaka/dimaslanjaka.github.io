/*--- inner-0 --*/



    const searchURL = "https://www.webmanajemen.com/search.xml";
    fetch(searchURL).then(response => response.text()).then(response => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response, "text/xml");
      const root = xmlDoc.getElementsByTagName("search")[0]
      const baseURL = new URL('https://www.webmanajemen.com')
      const results = Array.from(root.children).map(el => {
        baseURL.pathname = el.querySelector('url').innerHTML.trim().replace(/^\/+/, '/')
        const title = el.querySelector('title').innerHTML.trim()
        return {
          title,
          content: el.querySelector('content').innerHTML.trim(),
          url: baseURL.toString(),
          card: document.querySelector(
            'div.card[title="' + title + '"]'
          )
        }
      })

      const querySearch = getParameterByName('q')
      if (querySearch) {
        document.getElementById('title').innerHTML = querySearch + ' Search Result'
      } else {
        document.getElementById('title').innerHTML = 'WMI Site Search'
      }

      results.forEach(item => {
        const card = item.card
        if (card) {
          // supress image error
          const checkImageBroken = function () {
            const img = card.querySelector('img[source]')
            const source = img.getAttribute('source')
            const imgElement = new Image();
            imgElement.addEventListener('load', () => (img.src = source));
            //imgElement.addEventListener('error', () => resolve(false));
            imgElement.src = source
          }


          if (querySearch) {
            const matchTitle = new RegExp(querySearch, 'igm').test(item.title)
            const matchContent = new RegExp(querySearch, 'igm').test(item.content)
            if (matchTitle || matchContent) {
              // matched
              checkImageBroken()
            } else {
              card.remove()
            }
          }
        }
      })
    });

    document.getElementById('form-search').addEventListener('submit', function (_e) {
      _e.preventDefault()
      location.href = '/search/?q=' + _e.target.elements.q.value
      return false
    })

    function cardClickHandler(el) {
      const perm = el.getAttribute('permalink')
      //window.location.href = perm
      window.open(perm, 'wmi').focus()
    }

    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  


