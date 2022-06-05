const em_module = require('./zxing.js');
const ZXing = em_module();
const Canvas = require('canvas')
  , Image = Canvas.Image;
const fs = require('fs');

fs.readFile(__dirname + '/Qr-10.png', function(err, squid){
    if (err) throw err;
    img = new Image;
    img.src = squid;

    let width = Math.floor(img.width), height = Math.floor(img.height);
    let canvas = new Canvas(width, height);
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    var imageData = ctx.getImageData(0, 0, width, height);
    var idd = imageData.data;

    var decodeCallback = function (ptr, len, resultIndex, resultCount) {
      var result = new Uint8Array(ZXing.HEAPU8.buffer, ptr, len);
      console.log(String.fromCharCode.apply(null, result));
    };
    var decodePtr = ZXing.Runtime.addFunction(decodeCallback);

    var image = ZXing._resize(width, height);
    console.time("decode QR");
    for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
      ZXing.HEAPU8[image + j] = idd[i];
    }
    var err = ZXing._decode_qr(decodePtr);
    console.timeEnd('decode QR');

    console.log("error code", err);
  });