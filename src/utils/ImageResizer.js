const innerTools = {
  getBase64: (file, callBack) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e.target.result;

      if (callBack) {
        callBack(null, base64);
      }
    };
    reader.onerror = (e) => {
      if (callBack) {
        callBack(reader.error);
      }
      reader.abort();
    };

    reader.readAsDataURL(file);
  },

  //--处理数据源。。。。将所有数据源都处理成为图片对象，方便处理。
  getImage: (data, dataType, callback) => {
    const deal = src => {
      const image = new Image();

      image.src = src;

      image.onload = function () {
        if (callback) {
          callback(null, image);
        }
      }
      image.onerror = (e) => {
        if (callback) {
          callback(e);
        }
      }
    }

    let src;
    switch (dataType) {
      case 'url' :
      case 'base64' :
        src = data;
        break;

      case 'canvas' :
        src = data.toDataURL('image/png');
        break;

      case 'file' :
        this.getBase64(function (err, base64) {
          if (err) {
            callback(err);
            return;
          }

          deal(base64);
        });
        return;

      default:
        if (callback) {
          callback('invalid data!');
        }
        return;
    }

    deal(src);
  },

  //计算图片的需要压缩的尺寸。当然，压缩模式，压缩限制直接从setting里面取出来。
  getResizeSize: (image, settings) => {
    const _img_info = {
      w: image.width,
      h: image.height
    };

    if (_img_info.w <= settings.maxWidth && _img_info.h <= settings.maxHeight) {
      return _img_info;
    }

    const _percent_scale = parseFloat(_img_info.w / _img_info.h);
    switch (settings.resizeMode) {
      case 'width':
        if (_img_info.w <= settings.maxWidth) {
          return _img_info;
        }

        return {
          w: settings.maxWidth,
          h: parseInt(settings.maxWidth / _percent_scale)
        };

      case 'height':
        if (_img_info.h <= settings.maxHeight) {
          return _img_info;
        }

        return {
          w: parseInt(settings.maxHeight * _percent_scale),
          h: settings.maxHeight
        };

      default:
        const _size_by_mw = {
          w: settings.maxWidth,
          h: parseInt(settings.maxWidth / _percent_scale)
        };
        const _size_by_mh = {
          w: parseInt(settings.maxHeight * _percent_scale),
          h: settings.maxHeight
        };
        if (_size_by_mw.h <= settings.maxHeight) {
          return _size_by_mw;
        }
        if (_size_by_mh.w <= settings.maxWidth) {
          return _size_by_mh;
        }

        return {
          w: settings.maxWidth,
          h: settings.maxHeight
        };
    }
  },

  //--将相关图片对象画到canvas里面去。
  drawCanvas: (img, theW, theH, realW, realH, callback) => {
    const canvas = document.createElement('canvas');
    canvas.width = theW;
    canvas.height = theH;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, realW, realH, 0, 0, theW, theH);

    const base64 = canvas.toDataURL('image/png');
    if (callback) {
      callback(base64);
    }
  }
};

class ImageResizer {
  settings = {
    resizeMode: 'auto',
    // auto, width, height.
    // auto: automatic resize according to the maximum width and height ratio.
    // width: only according to the width, whether equal proportion resize is needed or not is judged.
    // height: only according to the height.
    maxWidth: 400,
    maxHeight: 400,
  };

  constructor(settings) {
    this.settings = Object.assign({}, this.settings, settings);
  }

  reset(settings) {
    this.settings = Object.assign({}, this.settings, settings);
  }

  execute(data, dataType, callback) {
    innerTools.getImage(data, dataType, (err, image) => {
      if (err) {
        if (callback) {
          callback(err);
        }
        return;
      }

      const _limitSizeInfo = innerTools.getResizeSize(image, this.settings);

      innerTools.drawCanvas(image, _limitSizeInfo.w, _limitSizeInfo.h, image.width, image.height, (base64) => {
        if (callback) {
          callback(null, base64);
        }
      });
    });
  }
}

export default ImageResizer;