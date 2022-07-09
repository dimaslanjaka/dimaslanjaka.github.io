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
    .then((data) => {
      /**
       * @type {string[]}
       */
      const attendants = data.data;
      const tbh =
        "<table class='table'><thead><tr><th>Name</th><th>Value</th></thead><tbody>";
      const tbf = '</tbody></table>';
      let results = [];
      attendants.forEach((item) => {
        //console.log(item);
        let build = [];
        Object.keys(item).forEach((key) => {
          let val = item[key];
          if (Array.isArray(val)) val = val.join(', ');
          if (key === 'qty') key = 'Quality';
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
      results = results.map((o) => {
        return o.header + tbh + o.items + tbf;
      });
      //console.log(results);
      attendantWrapper.innerHTML = results.join('');
      console.log('attendant updated successfully');
    })
    .then(() => scrollTo());
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

function scrollTo(id) {
  // scroll to div
  const end_id = id || window.location.hash.split('#')[1] || null;
  if (!end_id) return console.log('[scroll] empty id');
  const target = document.querySelector("[id*='" + end_id + "'");
  if (!target)
    return console.log('[scroll] empty target element with id=' + id);
  console.log('[scroll] to #' + end_id);
  window.scroll({
    top: target.offsetTop,
    left: 0,
    behavior: 'smooth'
  });
}
