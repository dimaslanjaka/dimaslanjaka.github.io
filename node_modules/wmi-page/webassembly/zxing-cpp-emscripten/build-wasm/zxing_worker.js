// These will be set when the first image is passed in
var image=null;
var width, height;

var ZXing = null;
var decodePtr = null;

var Module = {
  onRuntimeInitialized: function () {
    ZXing = Module;
    decodePtr = ZXing.addFunction(decodeCallback, 'viiiiffffffff');
    //console.log("Setup, decodePtr is " + decodePtr);
    //console.log(ZXing);
  }
};

var decodeCallback = function(ptr, len, resultIndex, resultCount, x0, y0, x1, y1, x2, y2, x3, y3) {
  var result = new Uint8Array(ZXing.HEAPU8.buffer, ptr, len);
  //console.log(String.fromCharCode.apply(null, result));
  postMessage({
    payload_string: String.fromCharCode.apply(null, result),
    length: len,
    result_index: resultIndex,
    result_count: resultCount,
    x0: x0,
    y0: y0,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    x3: x3,
    y3: y3
  });
};

// Use something like this with the Rails asset pipeline:
//fetch('<%= asset_path('zxing.wasm') %>')
//  .then(function(response) {
//    return response.arrayBuffer();
//  }).then(function(wasm_file) {
//    Module['wasmBinary'] = wasm_file;
//    importScripts('<%= asset_path('zxing.js') %>');
//  });

// The point of handling loading in this manner is to
// allow other filenames for the wasm and js files.  Rails
// in particular will rename these files, and loading them
// straight won't work.
fetch('zxing.wasm')
  .then(function(response) {
    return response.arrayBuffer();
  }).then(function(wasm_file) {
    Module['wasmBinary'] = wasm_file;
    importScripts('zxing.js');
  });

self.onmessage = function(msg) {
  zxing_process_image_data(msg.data);
}

function zxing_process_image_data(img_data) {
  //console.time('decoding');
  if (!image) {
    //console.log(img_data);
    width = img_data.width;
    height = img_data.height;
    //console.log("Setting up image, " + width + "x" + height);
    image = ZXing._resize(width, height);
  }

  //console.log("Reading image data: " + img_data.data.length + " bytes");

  var data = img_data.data;

  for (var i=0, j=0; i < data.length; i+=4, j++) {
    // Got this from another decoder - turns RGB into grayscale with a
    // weighting making green heaviest, followed by red and blue.
    // Yury Delendik may have written it.
    ZXing.HEAPU8[image + j] = (data[i] * 66 + data[i + 1] * 129 + data[i + 2] * 25 + 4096) >> 8;
    //Module.HEAPU8[image + j] = data[i];
  }

  var err = ZXing._decode_any(decodePtr);
  if (err) {
    //console.log("Error code: " + err);
	 // Errors are:
	 // -2: zxing::ReaderException
	 // -3: zxing::IllegalArgumentException
	 // -4: zxing::Exception
	 // -5: std::exception
  }
  postMessage('done');
  //console.timeEnd('decoding');
}
