/// <reference path="./script.d.ts" />

/**
 * @type {TocLevels}
 */
var sample = [];
var root = '#contents';
var Wrapper = document.querySelector(root);
if (!Wrapper) Wrapper = document;
if (Wrapper) {
	var inner = Wrapper.querySelectorAll('h1,h2,h3,h4,h5,h6,*[id]');
	if (inner.length) {
		inner.forEach(function (el) {
			var tagname = el.tagName.toLowerCase();
			var getIndexH = null;
			var matchH = /h([\d]).*/.exec(tagname);
			if (matchH) getIndexH = matchH[1];
			let elementId = el.getAttribute('id');
			const generatedId = el.textContent.toLowerCase().split(/\s+/).join('-');
			if (!el.hasAttribute('id') || !elementId || (elementId && !elementId.length)) {
				el.setAttribute('id', generatedId);
				elementId = el.getAttribute('id');
			}

			//console.log(generatedId, elementId);
			/**
			 * @type {TocObject}
			 */
			const tocObject = {
				tagname: el.tagName.toLowerCase(),
				id: elementId,
				text: el.textContent,
				inner: [],
				descendants: [],
			};
			if (getIndexH == '1') {
				sample.push(tocObject);
			} else if (sample.length) {
				const getLastH1LevelInner = sample.at(-1).inner;
				const getLastH2LevelInner =
					getLastH1LevelInner && getLastH1LevelInner.length ? getLastH1LevelInner.at(-1).inner : null;
				const getLastH3LevelInner =
					getLastH2LevelInner && getLastH2LevelInner.length ? getLastH2LevelInner.at(-1).inner : null;
				const getLastH4LevelInner =
					getLastH3LevelInner && getLastH3LevelInner.length ? getLastH3LevelInner.at(-1).inner : null;
				const getLastH5LevelInner =
					getLastH4LevelInner && getLastH4LevelInner.length ? getLastH4LevelInner.at(-1).inner : null;
				const getLastH6LevelInner =
					getLastH5LevelInner && getLastH5LevelInner.length ? getLastH5LevelInner.at(-1).inner : null;
				if (matchH) {
					// h2-h6
					switch (getIndexH) {
						case '2':
							getLastH1LevelInner.push(tocObject);
							break;

						case '3':
							getLastH2LevelInner.push(tocObject);
							break;

						case '4':
							getLastH3LevelInner.push(tocObject);
							break;

						case '5':
							getLastH4LevelInner.push(tocObject);
							break;

						case '6':
							getLastH5LevelInner.push(tocObject);
							break;
					}
				} else {
					delete tocObject.inner;
					delete tocObject.descendants;
					if (isNotNullNotEmpty(getLastH6LevelInner)) {
						getLastH6LevelInner.at(-1).descendants.push(tocObject);
					} else if (isNotNullNotEmpty(getLastH5LevelInner)) {
						getLastH5LevelInner.at(-1).descendants.push(tocObject);
					} else if (isNotNullNotEmpty(getLastH4LevelInner)) {
						getLastH4LevelInner.at(-1).descendants.push(tocObject);
					} else if (isNotNullNotEmpty(getLastH3LevelInner)) {
						getLastH3LevelInner.at(-1).descendants.push(tocObject);
					} else if (isNotNullNotEmpty(getLastH2LevelInner)) {
						getLastH2LevelInner.at(-1).descendants.push(tocObject);
					} else if (isNotNullNotEmpty(getLastH1LevelInner)) {
						getLastH1LevelInner.at(-1).descendants.push(tocObject);
					}
				}
			}
		});
		//document.getElementById('dump').innerHTML = JSON.stringify(sample, null, 2);
	}

	// build ul li
	if (sample.length) {
		const iterate = sample.map(iterateTOC).join('\n\n');
		const tocWrapper = document.getElementById('toc');
		tocWrapper.innerHTML = '<nav class="table-of-contents" role="toc"><ul>' + iterate + '</ul></nav>';
		// integrate highlight
		tocWrapper.querySelectorAll('a[href^="#"]').forEach(el => {
			el.addEventListener('click', () => highlightToc(el.getAttribute('href').replace(/^\#/, '')));
		});
	}
}

/**
 * Iterator
 * @param {TocObject} toc
 */
function iterateTOC(toc) {
	if (toc.length) return null;
	/**
	 *
	 * @param {TocDescendant} descendant
	 * @returns
	 */
	const parseDescendant = descendant => {
		const text = descendant.id.split('-').join(' ');
		return `<a href="#${descendant.id}">${text}</a>`;
	};
	const descendants = toc.descendants ? toc.descendants.map(parseDescendant).join('<br/>') : '';
	const inner = toc.inner ? toc.inner : '';
	const loop = inner.length ? inner.map(iterateTOC).join('\n') : '';
	let build = `<li><a href="#${toc.id}">${toc.text}</a>`;
	if (descendants.length)
		build += `\n<p class="table-of-contents" style="margin:0px;margin-left:1.7em;border:0px;padding:0px">${descendants}</p>`;
	if (loop.length) build += `\n<ul>${loop}</ul>`;
	return build + '</li>';
}

function highlightToc(id) {
	const select = document.getElementById(id);
	document.querySelectorAll('.highlight-string').forEach(el => el.classList.remove('highlight-string'));
	if (select) {
		select.classList.toggle('highlight-string', true);
	}
}

/**
 * Check is array not null and not empty
 * @param {Array} arr
 * @returns
 */
function isNotNullNotEmpty(arr) {
	return arr && arr.length;
}
