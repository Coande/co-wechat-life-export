const controlMap = require('./control-map.js');

module.exports = () => {
  // 获取经纬度（需要借助谷歌地图com.google.android.apps.maps）
  const googleMapsName = getAppName('com.tencent.mobileqq');
  if (googleMapsName) {
    const locationTextCom = id(controlMap.locationText).findOnce();
    locationTextCom.click();
    // TODO: 涉及到网页操作，有空再搞
  }
};
