/* global CONFIG, pjax, LocalSearch */

document.addEventListener('DOMContentLoaded', () => {
  const els = Array.from(document.querySelectorAll('pre code'));
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    // trigger highlight.js
    hljs.highlightBlock(el);
    // create copy to clipboard button
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-sm', 'btn-pre', 'border');
    btn.textContent = 'copy';
    el.parentElement.append(btn);
  }

  // copy to clipboard
  document.addEventListener('click', function (e) {
    /**
     * @type {HTMLElement}
     */
    const el = e.target;
    if (el.classList.contains('btn-pre')) {
      const content = el.parentElement.textContent;
      copyTextToClipboard(content);
    }
  });

  const localSearch = new LocalSearch({
    path: CONFIG.path,
    top_n_per_article: CONFIG.localsearch.top_n_per_article,
    unescape: CONFIG.localsearch.unescape
  });
  localSearch.fetchData();

  /**
   * @type {HTMLInputElement[]}
   */
  const inputs = Array.from(document.querySelectorAll('.search-input'));

  /**
   * Search input event
   * @param {Event} e
   * @returns
   */
  const inputEventFunction = function (e) {
    if (!localSearch.isfetched) return console.info('local search not fetched yet');
    let searchText = '';
    if (e.target.tagName.toLowerCase() == 'form') {
      searchText = e.target.querySelector('.search-input').value.trim().toLowerCase();
    } else if (e.target.tagName.toLowerCase() == 'input') {
      searchText = e.target.value.trim().toLowerCase();
    } else {
      return console.debug(e.target);
    }
    const keywords = searchText.split(/[-\s]+/).filter((str) => str.trim().length > 0);
    const container = document.querySelector('.search-result-container');
    let resultItems = [];
    if (searchText.length > 0) {
      // Perform local searching
      resultItems = localSearch.getResultItems(keywords);
    }
    if (keywords.length === 1 && keywords[0] === '') {
      container.classList.add('no-result');
      container.innerHTML = '<div class="search-result-icon"><i class="fa fa-search fa-5x"></i></div>';
    } else if (resultItems.length === 0) {
      container.classList.add('no-result');
      container.innerHTML = '<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>';
    } else {
      resultItems.sort((left, right) => {
        if (left.includedCount !== right.includedCount) {
          return right.includedCount - left.includedCount;
        } else if (left.hitCount !== right.hitCount) {
          return right.hitCount - left.hitCount;
        }
        return right.id - left.id;
      });
      const stats = CONFIG.i18n.hits.replace('${hits}', resultItems.length);

      container.classList.remove('no-result');
      container.innerHTML = `<div class="search-stats">${stats}</div>
        <hr>
        <ul class="search-result-list">${resultItems.map((result) => result.item).join('')}</ul>`;
      if (typeof pjax === 'object') pjax.refresh(container);
    }
  };

  inputs.forEach((input) => {
    input.addEventListener('input', inputEventFunction);
    input.addEventListener('click', inputEventFunction);
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        inputEventFunction();
      }
    });
  });
  document.getElementById('search-form').addEventListener('submit', inputEventFunction);
});

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
}
