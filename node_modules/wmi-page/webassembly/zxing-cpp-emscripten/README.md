# Building WebAssembly ZXing on Windows or Unix/Linux

The repository is based on [ZXing Emscripten build](https://github.com/kig/zxing-cpp-emscripten).

## Emscripten Installation
1. Download [emsdk-portable-64bit.zip](https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable-64bit.zip)
2. Fetch the latest registry of available tools:
  
    ```
    emsdk update
    ```
3. Download and install the latest SDK tools:

    ```
    emsdk install latest
    ```
3. Make the "latest" SDK "active" for the current user:

    ```
    emsdk activate latest
    ```
4.  Activate PATH and other environment variables in the current terminal:

    ```
    emsdk_env
    ```

## JavaScript ZXing
To build:

  1. `cd build-js`
  2. Run `configure.bat`
  3. Run `build.bat`
  4. Add the path of **build-js** folder to **IIS**.
  5. Open `http://localhost:2588/test.html`.

To use:

``` javascript
    <script>
		var tick = function () {
			if (window.ZXing) {
				ZXing = ZXing();
				testZXing();
			} else {
				setTimeout(tick, 10);
			}
		};
		tick();

		function testZXing() {
			var img = new Image;
			img.src = 'Qr-10.png';
			img.onload = function () {

				var width = Math.floor(this.width),
					height = Math.floor(this.height);

				var canvas = document.createElement('canvas');
				canvas.style.display = 'block';
				canvas.width = width;
				canvas.height = height;
				var ctx = canvas.getContext('2d');
				// ctx.rotate(Math.random()*0.1-0.05);
				ctx.drawImage(this, 0, 0, width, height);
				var imageData = ctx.getImageData(0, 0, width, height);
				var idd = imageData.data;
				document.body.appendChild(canvas);

				var decodeCallback = function (ptr, len, resultIndex, resultCount) {
					var result = new Uint8Array(ZXing.HEAPU8.buffer, ptr, len);
					window.resultString = String.fromCharCode.apply(null, result);
				};
				var decodePtr = ZXing.Runtime.addFunction(decodeCallback);

				var image = ZXing._resize(width, height);

				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}

				var err = ZXing._decode_qr(decodePtr);

				console.log("error code", err);
				console.log("result", window.resultString);

				document.body.appendChild(document.createTextNode(err ? ("error: " + err) : window.resultString));

				for (var k = 0; k < 50; k++) {
					for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
						ZXing.HEAPU8[image + j] = idd[i];
					}
					err = ZXing._decode_qr_multi(decodePtr);
					err = ZXing._decode_qr(decodePtr);
				}

				console.time("decode QR");
				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}
				err = ZXing._decode_qr(decodePtr);
				console.timeEnd("decode QR");

				console.time("decode QR multi");
				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}
				err = ZXing._decode_qr_multi(decodePtr);
				console.timeEnd("decode QR multi");

				console.time("decode any");
				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}
				err = ZXing._decode_any(decodePtr);
				console.timeEnd("decode any");

				console.time("decode multi");
				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}
				err = ZXing._decode_multi(decodePtr);
				console.timeEnd("decode multi");

			};
		};
	</script>
  <script async src="zxing.js"></script>
```

## WebAssembly ZXing
To build:

  1. `cd build-wasm`
  2. Run `configure.bat`
  3. Run `build.bat`
  4. Add the path of **build-wasm** folder to **IIS**.
  5. Open `http://localhost:2588/test.html`.

To use:

``` javascript
    <script>
		var ZXing;
		var Module = {
			onRuntimeInitialized: function () {
				ZXing = Module;
				testZXing();
			}
		};

		function testZXing() {
			var img = new Image;
			img.src = 'Qr-10.png';
			img.onload = function () {

				var width = Math.floor(this.width),
					height = Math.floor(this.height);

				var canvas = document.createElement('canvas');
				canvas.style.display = 'block';
				canvas.width = width;
				canvas.height = height;
				var ctx = canvas.getContext('2d');
				// ctx.rotate(Math.random()*0.1-0.05);
				ctx.drawImage(this, 0, 0, width, height);
				var imageData = ctx.getImageData(0, 0, width, height);
				var idd = imageData.data;
				document.body.appendChild(canvas);

				var decodeCallback = function (ptr, len, resultIndex, resultCount) {
					var result = new Uint8Array(ZXing.HEAPU8.buffer, ptr, len);
					window.resultString = String.fromCharCode.apply(null, result);
				};
				var decodePtr = ZXing.Runtime.addFunction(decodeCallback);

				var image = ZXing._resize(width, height);

				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}

				var err = ZXing._decode_qr(decodePtr);

				console.log("error code", err);
				console.log("result", window.resultString);

				document.body.appendChild(document.createTextNode(err ? ("error: " + err) : window.resultString));

				for (var k = 0; k < 50; k++) {
					for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
						ZXing.HEAPU8[image + j] = idd[i];
					}
					err = ZXing._decode_qr_multi(decodePtr);
					err = ZXing._decode_qr(decodePtr);
				}

				console.time("decode QR");
				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}
				err = ZXing._decode_qr(decodePtr);
				console.timeEnd("decode QR");

				console.time("decode QR multi");
				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}
				err = ZXing._decode_qr_multi(decodePtr);
				console.timeEnd("decode QR multi");

				console.time("decode any");
				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}
				err = ZXing._decode_any(decodePtr);
				console.timeEnd("decode any");

				console.time("decode multi");
				for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
					ZXing.HEAPU8[image + j] = idd[i];
				}
				err = ZXing._decode_multi(decodePtr);
				console.timeEnd("decode multi");

			};
		};
	</script>
  <script async src="zxing.js"></script>
```

## Performance

![JavaScript ZXing vs WebAssembly ZXing](http://www.codepool.biz/wp-content/uploads/2018/01/javascript-webassembly-zxing-performance.PNG)

## Blog
- [Building JavaScript and WebAssembly ZXing on Windows](http://www.codepool.biz/building-webassembly-zxing-windows.html)
- [Building HTML5 Barcode Reader with Pure JavaScript SDK](http://www.codepool.biz/html5-barcode-reader-javascript-webassembly.html)
