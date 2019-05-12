const constant = require('./constant.js');

module.exports = (() => {
  console.log('请求截图');
  // 请求截图
  if (!requestScreenCapture()) {
    toastLog('请求截图失败');
    exit();
  }
  return {
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
        images.save(clip, targetPath);
        return fileName;
      }
      return '';
    },
  };
})();
