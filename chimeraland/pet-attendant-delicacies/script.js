// source https://codepen.io/dimaslanjaka/pen/dymMwxL?editors=0010#shaman-regni
// source https://www.webmanajemen.com/chimeraland/pet-attendant-delicacies.html#rosary-twinkel
// backend https://hexo-backend.herokuapp.com/chimeraland/attendant
// backend https://hexo-backend.herokuapp.com/chimeraland/pet
const attendantWrapper = document.querySelector('#a-tbl');
const petWrapper = document.querySelector('#p-tbl');

if (location.host === 'cdpn.io') {
  console.clear();
}

window.onload = function () {
  getAttendant()
    .then((data) => {
      data.data = uniq(data.data, 'name');
      //console.log(data);
      return data;
    })
    .then((attendant_data) => {
      /**
       * @type {string[]}
       */
      const attendants = attendant_data.data;
      const tbh =
        "<table class='table'><thead><tr><th>Name</th><th>Value</th></thead><tbody>";
      const tbf = '</tbody></table>';
      let results = [];
      attendants.forEach((item) => {
        //console.log(item);
        let build = [];
        Object.keys(item).forEach((key) => {
          let val = item[key];
          if (key === 'qty') key = 'Quality';
          if (key === 'delicacies') {
            val = val.map((str) => {
              const query = str.replace('-', '').toLowerCase();
              return `<a href='/chimeraland/Recipes.html?query=${query}'>${query}</a><span class='mr-2'>,</span>`;
            });
            val = val.join('');
          }
          if (Array.isArray(val)) val = val.join(', ');
          key = key.toUpperCase();
          //console.log(key, val);
          build.push(`<tr><td>${key}</td><td>${val}</td></tr>`);
        });
        //console.log(build);
        const header_id = item['name']
          .replace(/\s+/gm, '-')
          .replace(/-+/gm, '-')
          .toLowerCase();
        const header = `<div class="d-flex justify-content-between"><div id='${header_id}'><h3>${item['name']}</h3></div><div><a href="#${header_id}">${header_id}</a></div></div>`;
        results.push({ header, items: build.join('') });
      });
      // merge table
      results = results.map((o) => {
        return o.header + tbh + o.items + tbf;
      });
      //console.log(results);
      attendantWrapper.innerHTML = results.join('');
      console.log('attendant updated successfully');
    })
    .then(() => {
      scrollTo().then((o) => {
        setTimeout(() => {
          scrollTo().then((o1) => {
            console.log(o, o1);
          });
        }, 3000);
      });
    });
};

function getAttendant() {
  return fetch(attendantJson())
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

function attendantJson() {
  return (
    '//backend.webmanajemen.com/chimeraland/attendant.php?show=' +
    new Date().getTime()
  );
}

// https://stackoverflow.com/a/67322087/6404439
function uniq(arr, field) {
  //console.log(array);
  if (!Array.isArray(arr)) {
    throw new Error('array param must be instance of ARRAY');
  }
  return arr.filter(
    (a, i) => arr.findIndex((s) => a[field] === s[field]) === i
  );
}

// scroll to div
function scrollTo(id) {
  return new Promise((resolve) => {
    const end_id = id || window.location.hash.split('#')[1] || null;
    if (!end_id) return console.log('[scroll] empty id');
    const selector = "[id*='" + end_id + "']";
    const target = document.querySelector(selector);
    target.scrollIntoView(true);
    if (!target)
      return console.log('[scroll] empty target element with id=' + end_id);
    console.log('[scroll] to #' + end_id);
    const isFirefox = 'netscape' in window && / rv:/.test(navigator.userAgent);

    if (isFirefox) {
      // scroll to center element
      target.scrollIntoView({ block: 'center' });
    } else {
      // scroll to top element
      window.scroll({
        top: target.offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    }

    resolve({
      offset: target.offsetTop,
      id: end_id,
      selector
    });
  });
}
