const constant = require('./constant.js');
const controlMap = require('./control-map.js');
const utils = require('./utils.js');

function doSaveMedia(mediaCom, mediaType) {
  let currentLatestFileName = '';
  mediaCom.click();
  if (mediaType === 'picture') {
    // console.log('等待图片浏览activity');
    waitForActivity('com.tencent.mm.plugin.sns.ui.SnsBrowseUI');
    // id(controlMap.picturePlayerWrapper).waitFor();
  } else {
    // console.log('等待视频浏览activity');
    waitForActivity('com.tencent.mm.plugin.sns.ui.SnsOnlineVideoActivity');
    // id(controlMap.videoPlayerWrapper).waitFor();
  }
  sleep(500);
  const longClickResult = longClick(device.width / 2, device.height / 2);
  if (!longClickResult) {
    console.error('长按结果：', longClickResult);
  }
  // 先扫一遍文件夹的内容
  const shellResult = shell(`ls -t ${constant.wechatMediaDir}`);
  const latestFileName = shellResult.result.split('\n')[0];
  const saveMediaMenuName = mediaType === 'picture' ? '保存图片' : '保存视频';
  const savePicCom = text(saveMediaMenuName)
    .untilFind()
    .get(0);
  const clickResult = utils.superClick(savePicCom);
  if (!clickResult) {
    console.log('点击结果：', clickResult);
  }
  let saveFlag = false;
  while (!saveFlag) {
    // 再扫一遍以确定是否保存成功
    const shellResult2 = shell(`ls -t ${constant.wechatMediaDir}`);
    currentLatestFileName = shellResult2.result.split('\n')[0];
    if (currentLatestFileName !== latestFileName) {
      saveFlag = true;
    }
    sleep(500);
  }
  sleep(2000);
  if (text('识别图中二维码').findOnce()) {
    back();
    sleep(500);
  }
  back();
  waitForActivity('com.tencent.mm.plugin.sns.ui.SnsCommentDetailUI');
  return currentLatestFileName;
}

module.exports = {
  savePicture() {
    const saveFileNameList = [];
    const pictureList = desc('图片').find();
    if (!pictureList.empty()) {
      pictureList.forEach((picture) => {
        const saveFileName = doSaveMedia(picture, 'picture');
        saveFileNameList.push(saveFileName);
      });
    }
    return saveFileNameList;
  },
  saveVideo() {
    let saveFileName = '';
    const videoCom = id(controlMap.videoWrapper).findOnce();
    if (videoCom) {
      saveFileName = doSaveMedia(videoCom, 'video');
    }
    return saveFileName;
  },
};
