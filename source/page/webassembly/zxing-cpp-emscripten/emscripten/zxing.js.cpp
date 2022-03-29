// -*- mode:c++; tab-width:2; indent-tabs-mode:nil; c-basic-offset:2 -*-
/*
 *  Copyright 2010-2011 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include <string>
#include <zxing/common/Counted.h>
#include <zxing/Binarizer.h>
#include <zxing/MultiFormatReader.h>
#include <zxing/oned/CodaBarReader.h>
#include <zxing/oned/Code128Reader.h>
#include <zxing/oned/Code39Reader.h>
#include <zxing/oned/Code93Reader.h>
#include <zxing/oned/EAN13Reader.h>
#include <zxing/oned/EAN8Reader.h>
#include <zxing/oned/ITFReader.h>
#include <zxing/oned/MultiFormatOneDReader.h>
#include <zxing/oned/MultiFormatUPCEANReader.h>
#include <zxing/oned/UPCAReader.h>
#include <zxing/oned/UPCEReader.h>
#include <zxing/Result.h>
#include <zxing/ReaderException.h>
#include <zxing/common/GlobalHistogramBinarizer.h>
#include <zxing/common/HybridBinarizer.h>
#include <exception>
#include <zxing/Exception.h>
#include <zxing/common/IllegalArgumentException.h>
#include <zxing/BinaryBitmap.h>
#include <zxing/DecodeHints.h>

#include <zxing/qrcode/QRCodeReader.h>
#include <zxing/multi/qrcode/QRCodeMultiReader.h>
#include <zxing/multi/ByQuadrantReader.h>
#include <zxing/multi/MultipleBarcodeReader.h>
#include <zxing/multi/GenericMultipleBarcodeReader.h>

#include <zxing/LuminanceSource.h>

#include <zxing/Binarizer.h>
#include <zxing/common/BitArray.h>
#include <zxing/common/BitMatrix.h>
#include <zxing/common/Array.h>

#include <emscripten.h>

using namespace std;
using namespace zxing;
using namespace zxing::qrcode;
using namespace zxing::multi;
using namespace zxing::oned;


class ImageReaderSource : public zxing::LuminanceSource {
private:
  typedef LuminanceSource Super;

  const zxing::ArrayRef<char> image;

  char convertPixel(const char* pixel) const;

public:
  ImageReaderSource(zxing::ArrayRef<char> image, int width, int height);

  zxing::ArrayRef<char> getRow(int y, zxing::ArrayRef<char> row) const;
  zxing::ArrayRef<char> getMatrix() const;
};

ImageReaderSource::ImageReaderSource(ArrayRef<char> image_, int width, int height)
    : Super(width, height), image(image_) {}

zxing::ArrayRef<char> ImageReaderSource::getRow(int y, zxing::ArrayRef<char> row) const {
  const char* pixelRow = &image[0] + y * getWidth();
  if (!row) {
    row = zxing::ArrayRef<char>(getWidth());
  }
  for (int x = 0; x < getWidth(); x++) {
    row[x] = pixelRow[x];
  }
  return row;
}

zxing::ArrayRef<char> ImageReaderSource::getMatrix() const {
  return image;
  // zxing::ArrayRef<char> matrix(getWidth() * getHeight());
  // memcpy(&matrix[0], &image[0], getWidth() * getHeight());
  // return matrix;
}


class PassthroughBinarizer : public Binarizer {
private:
  ArrayRef<char> luminances;
public:
  PassthroughBinarizer(Ref<LuminanceSource> source);
  virtual ~PassthroughBinarizer();
    
  virtual Ref<BitArray> getBlackRow(int y, Ref<BitArray> row);
  virtual Ref<BitMatrix> getBlackMatrix();
  Ref<Binarizer> createBinarizer(Ref<LuminanceSource> source);
private:
  void initArrays(int luminanceSize);
};




using zxing::GlobalHistogramBinarizer;
using zxing::Binarizer;
using zxing::ArrayRef;
using zxing::Ref;
using zxing::BitArray;
using zxing::BitMatrix;

// VC++
using zxing::LuminanceSource;

namespace {
  const ArrayRef<char> EMPTY (0);
}

PassthroughBinarizer::PassthroughBinarizer(Ref<LuminanceSource> source) 
  : Binarizer(source), luminances(EMPTY) {}

PassthroughBinarizer::~PassthroughBinarizer() {}

void PassthroughBinarizer::initArrays(int luminanceSize) {
  if (luminances->size() < luminanceSize) {
    luminances = ArrayRef<char>(luminanceSize);
  }
}

Ref<BitArray> PassthroughBinarizer::getBlackRow(int y, Ref<BitArray> row) {
  // std::cerr << "gbr " << y << std::endl;
  LuminanceSource& source = *getLuminanceSource();
  int width = source.getWidth();
  if (row == NULL || static_cast<int>(row->getSize()) < width) {
    row = new BitArray(width);
  } else {
    row->clear();
  }

  initArrays(width);
  ArrayRef<char> localLuminances = source.getRow(y, luminances);
  for (int x = 0; x < width; x++) {
    if (luminances[x]) {
      row->set(x);
    }
  }
  return row;
}
 
Ref<BitMatrix> PassthroughBinarizer::getBlackMatrix() {
  LuminanceSource& source = *getLuminanceSource();
  int width = source.getWidth();
  int height = source.getHeight();
  Ref<BitMatrix> matrix(new BitMatrix(width, height));

  ArrayRef<char> localLuminances = source.getMatrix();
  for (int y = 0; y < height; y++) {
    int offset = y * width;
    for (int x = 0; x < width; x++) {
      if (localLuminances[offset + x]) {
        matrix->set(x, y);
      }
    }
  }
  
  return matrix;
}

Ref<Binarizer> PassthroughBinarizer::createBinarizer(Ref<LuminanceSource> source) {
  return Ref<Binarizer> (new PassthroughBinarizer(source));
}

vector<Ref<Result> > decode_qr_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> qrCodeReader(new QRCodeReader);
  return vector<Ref<Result> >(1, qrCodeReader->decode(image, hints));
}

vector<Ref<Result> > decode_qr_multi_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<MultipleBarcodeReader> qrCodeMultiReader(new QRCodeMultiReader);
  return qrCodeMultiReader->decodeMultiple(image, hints);
}

vector<Ref<Result> > decode_any_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> multiFormatReader(new MultiFormatReader);
  return vector<Ref<Result> >(1, multiFormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_multi_(Ref<BinaryBitmap> image, DecodeHints hints) {
  MultiFormatReader delegate;
  GenericMultipleBarcodeReader genericReader(delegate);
  return genericReader.decodeMultiple(image, hints);
}

vector<Ref<Result> > decode_codabar_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> codabarFormatReader(new CodaBarReader);
  return vector<Ref<Result> >(1, codabarFormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_code128_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> code128FormatReader(new Code128Reader);
  return vector<Ref<Result> >(1, code128FormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_code39_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> code39FormatReader(new Code39Reader);
  return vector<Ref<Result> >(1, code39FormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_code93_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> code93FormatReader(new Code93Reader);
  return vector<Ref<Result> >(1, code93FormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_ean13_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> ean13FormatReader(new EAN13Reader);
  return vector<Ref<Result> >(1, ean13FormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_ean8_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> ean8FormatReader(new EAN8Reader);
  return vector<Ref<Result> >(1, ean8FormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_itf_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> itfFormatReader(new ITFReader);
  return vector<Ref<Result> >(1, itfFormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_multi_one_d_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> multiOneDFormatReader(new MultiFormatOneDReader(hints));
  return vector<Ref<Result> >(1, multiOneDFormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_multi_upc_ean_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> multiUPCEANFormatReader(new MultiFormatUPCEANReader(hints));
  return vector<Ref<Result> >(1, multiUPCEANFormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_upca_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> upcaFormatReader(new UPCAReader);
  return vector<Ref<Result> >(1, upcaFormatReader->decode(image, hints));
}

vector<Ref<Result> > decode_upce_(Ref<BinaryBitmap> image, DecodeHints hints) {
  Ref<Reader> upceFormatReader(new UPCEReader);
  return vector<Ref<Result> >(1, upceFormatReader->decode(image, hints));
}

enum DECODE_MODE {
  QR,
  QR_MULTI,
  ANY,
  MULTI,
  CODABAR,
  CODE128,
  CODE39,
  CODE93,
  EAN13,
  EAN8,
  ITF,
  MULTI_ONE_D,
  MULTI_UPC_EAN,
  UPCA,
  UPCE
};


extern "C" {

  static const char *imagePtr = NULL;
  static zxing::ArrayRef<char> image = NULL;
  static Ref<LuminanceSource> source;

  const char* resize(int width, int height) {
    image = zxing::ArrayRef<char>(width*height);
    imagePtr = &image[0];
    source = Ref<LuminanceSource>(new ImageReaderSource(image, width, height));
    return imagePtr;
  }


  int __decode(DECODE_MODE mode, void *decode_callback(const char *resultStr, int resultStrLen, int resultIndex, int resultCount,
    float x0, float y0, float x1, float y1, float x2, float y2, float x3, float y3 )) {
    vector<Ref<Result> > results;
    int res = -1;

    Ref<Binarizer> binarizer;
    Ref<BinaryBitmap> binary;

    try {

      DecodeHints hints(DecodeHints::DEFAULT_HINT);
		//hints.setTryHarder(true);

      binarizer = new HybridBinarizer(source);
      //binarizer = new GlobalHistogramBinarizer(source);
      binary = new BinaryBitmap(binarizer);

      if (mode == DECODE_MODE::QR) {
        results = decode_qr_(binary, hints);
      } else if (mode == DECODE_MODE::QR_MULTI) {
        results = decode_qr_multi_(binary, hints);
      } else if (mode == DECODE_MODE::ANY) {
        results = decode_any_(binary, hints);
      } else if (mode == DECODE_MODE::MULTI) {
        results = decode_multi_(binary, hints);
      } else if (mode == DECODE_MODE::CODABAR) {
        results = decode_codabar_(binary, hints);
      } else if (mode == DECODE_MODE::CODE128) {
        results = decode_code128_(binary, hints);
      } else if (mode == DECODE_MODE::CODE39) {
        results = decode_code39_(binary, hints);
      } else if (mode == DECODE_MODE::CODE93) {
        results = decode_code93_(binary, hints);
      } else if (mode == DECODE_MODE::EAN13) {
        results = decode_ean13_(binary, hints);
      } else if (mode == DECODE_MODE::EAN8) {
        results = decode_ean8_(binary, hints);
      } else if (mode == DECODE_MODE::ITF) {
        results = decode_itf_(binary, hints);
      } else if (mode == DECODE_MODE::MULTI_ONE_D) {
        results = decode_multi_one_d_(binary, hints);
      } else if (mode == DECODE_MODE::MULTI_UPC_EAN) {
        results = decode_multi_upc_ean_(binary, hints);
      } else if (mode == DECODE_MODE::UPCA) {
        results = decode_upca_(binary, hints);
      } else if (mode == DECODE_MODE::UPCE) {
        results = decode_upce_(binary, hints);
		} else {
        results = decode_multi_(binary, hints);
      }

      res = 0;

    } catch (const ReaderException& e) {
      // cell_result = "zxing::ReaderException: " + string(e.what());
      res = -2;
    } catch (const zxing::IllegalArgumentException& e) {
      // cell_result = "zxing::IllegalArgumentException: " + string(e.what());
      res = -3;
    } catch (const zxing::Exception& e) {
      // cell_result = "zxing::Exception: " + string(e.what());
      res = -4;
    } catch (const std::exception& e) {
      // cell_result = "std::exception: " + string(e.what());
      res = -5;
    }

    if (res == 0) {
      for (int i=0; i<results.size(); i++) {
        std::string result = results[i]->getText()->getText();
        auto points = results[i]->getResultPoints();
        int xs[4] = {0}, ys[4] = {0};

        for (int j = 0; j < points->size(); j++) 
        {
            xs[j] = points[j]->getX();
            ys[j] = points[j]->getY();
        }

        decode_callback(result.c_str(), result.size(), i, results.size(), 
          xs[0], ys[0],
          xs[1], ys[1],
          xs[2], ys[2],
          xs[3], ys[3]
        );
      }
    }

    return res;
  }


  int decode_qr(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::QR, callback);
  }

  int decode_qr_multi(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::QR_MULTI, callback);
  }

  int decode_any(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::ANY, callback);
  }

  int decode_multi(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::MULTI, callback);
  }

  int decode_codabar(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::CODABAR, callback);
  }

  int decode_code128(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::CODE128, callback);
  }

  int decode_code39(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::CODE39, callback);
  }

  int decode_code93(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::CODE93, callback);
  }

  int decode_ean13(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::EAN13, callback);
  }

  int decode_ean8(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::EAN8, callback);
  }

  int decode_itf(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::ITF, callback);
  }

  int decode_multi_one_d(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::MULTI_ONE_D, callback);
  }

  int decode_multi_upc_ean(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::MULTI_UPC_EAN, callback);
  }

  int decode_upca(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::UPCA, callback);
  }

  int decode_upce(void *callback(const char*, int, int, int, float, float, float, float, float, float, float, float)) {
    return __decode(DECODE_MODE::UPCE, callback);
  }

}
