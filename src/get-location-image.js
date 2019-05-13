const constant = require('./constant.js');
const getOcrLocation = require('./get-ocr-location.js');

module.exports = (() => ({
  get() {
    const locationCom = id('ehx').findOnce();
    if (locationCom) {
      // 截图
      const img = captureScreen();
      const locationComRect = locationCom.bounds();

      const clip = images.clip(
        img,
        locationComRect.left,
        locationComRect.top,
        locationComRect.width(),
        locationComRect.height(),
      );
      const fileName = `location-${new Date().getTime()}.png`;
      const targetPath = `${constant.appDir}/location/${fileName}`;
      files.ensureDir(targetPath);
      const ocrText = getOcrLocation(clip);
      images.save(clip, targetPath);
      clip.recycle();
      return {
        fileName,
        ocrText,
      };
    }
    return '';
  },
}))();
