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
      return Promise.resolve(
        navs
          .querySelectorAll('li')
          .forEach((el) => el.classList.remove('active'))
      );
    };
    navs.addEventListener(
      'mouseover',
      function (e) {
        const tn = e.target.tagName.toLowerCase();
        if (tn == 'li')
          cleanNavs().then(() => e.target.classList.add('active'));
        if (tn == 'a' && e.target.parentElement.tagName.toLowerCase() == 'li')
          cleanNavs().then(() =>
            e.target.parentElement.classList.add('active')
          );
      },
      false
    );
  }
})();
