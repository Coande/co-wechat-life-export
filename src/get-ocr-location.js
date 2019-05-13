module.exports = (() => {
  const ocrPackage = 'org.autojs.plugin.ocr';
  const ocrPackageName = getAppName(ocrPackage);
  let ocr;
  if (ocrPackageName) {
    const OCR = plugins.load(ocrPackage);
    ocr = new OCR();
  }
  return (img) => {
    if (ocr) {
      const res = ocr.ocrImage(img);
      return res.text;
    }
    return '';
  };
})();
