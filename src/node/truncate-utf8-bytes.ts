// forked from module `truncate-utf8-bytes`
'use strict';

function isHighSurrogate(codePoint) {
  return codePoint >= 0xd800 && codePoint <= 0xdbff;
}

function isLowSurrogate(codePoint) {
  return codePoint >= 0xdc00 && codePoint <= 0xdfff;
}

// Truncate string by size in bytes
function truncate(getLength, string, byteLength) {
  if (typeof string !== 'string') {
    throw new Error('Input must be string');
  }

  const charLength = string.length;
  let curByteLength = 0;
  let codePoint;
  let segment;

  for (let i = 0; i < charLength; i += 1) {
    codePoint = string.charCodeAt(i);
    segment = string[i];

    if (
      isHighSurrogate(codePoint) &&
      isLowSurrogate(string.charCodeAt(i + 1))
    ) {
      i += 1;
      segment += string[i];
    }

    curByteLength += getLength(segment);

    if (curByteLength === byteLength) {
      return string.slice(0, i + 1);
    } else if (curByteLength > byteLength) {
      return string.slice(0, i - segment.length + 1);
    }
  }

  return string;
}

const getLength = Buffer.byteLength.bind(Buffer);
const main = truncate.bind(null, getLength);
export default main;
