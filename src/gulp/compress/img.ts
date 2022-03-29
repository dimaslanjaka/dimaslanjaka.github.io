import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import imageminPng from "imagemin-pngquant";
import imageminGif from "imagemin-gifsicle";
import imageminJpeg from "imagemin-jpegtran";
import imageminPng2 from "imagemin-optipng";
import imageminSvg from "imagemin-svgo";
import imageminJpegRecompress from "imagemin-jpeg-recompress";
import assign from "object-assign";

const defaultOpt = {
  enable: true,
  exclude: [],
  interlaced: false,
  multipass: false,
  optimizationLevel: 3,
  pngquant: false,
  webp: true,
  webpQuality: 75,
  gifslice: true,
  jpegtran: true,
  jpegrecompress: false,
  jpegrecompressQuality: "medium",
  optipng: true,
  svgo: true,
  progressive: false,
};

export default function (source: string[], output: string, options?: typeof defaultOpt) {
  if (typeof options == "object") {
    options = assign(defaultOpt, options);
  } else {
    options = defaultOpt;
  }

  return imagemin(source, {
    destination: output,
    plugins: [
      imageminGif({ interlaced: options.interlaced }),
      imageminJpeg({ progressive: options.progressive }),
      imageminPng2({ optimizationLevel: options.optimizationLevel }),
      imageminSvg({ multipass: options.multipass }),
      imageminWebp({ quality: options.webpQuality }),
      imageminPng(),
      imageminJpegRecompress({ quality: options.jpegrecompressQuality }),
    ],
  });
}
