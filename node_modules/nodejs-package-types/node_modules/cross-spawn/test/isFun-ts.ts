'use strict';

import spawnDist from '../dist';
import spawnSrc from '../src';

validate(spawnDist);
validate(spawnSrc);

function validate(o: typeof spawnDist | typeof spawnSrc) {
  console.log(typeof o === 'function');
  console.log(typeof o.sync === 'function');
  console.log(typeof o.async === 'function');
  console.log(typeof o.spawnAsync === 'function');
  console.log(typeof o.spawnSync === 'function');
}
