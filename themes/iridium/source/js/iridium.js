(function () {
  ///// navbar controller
  const navs = document.querySelector('#nav');
  if (navs) {
    navs.addEventListener(
      'mouseover',
      function (e) {
        const tn = e.target.tagName.toLowerCase();
        if (tn == 'li') e.target.classList.add('active');
        if (tn == 'a' && e.target.parentElement.tagName.toLowerCase() == 'li') e.target.parentElement.classList.add('active');
      },
      false
    );

    navs.addEventListener(
      'mouseout',
      function (e) {
        // clean active class
        navs.querySelectorAll('li').forEach((el) => el.classList.remove('active'));
      },
      false
    );
  }
})();
