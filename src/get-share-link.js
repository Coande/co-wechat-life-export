const utils = require('./utils.js');
const controlMap = require('./control-map.js');

module.exports = () => {
  desc('更多').waitFor();
  sleep(1000);
  const moreOP = desc('更多')
    .untilFind()
    .get(0);
  const clickResult = utils.superClick(moreOP);
  if (!clickResult) {
    console.log('点击结果：', clickResult);
  }
  const menuWrapper = id(controlMap.browserMenuWrapper)
    .untilFind()
    .get(0);

  let shareLink = '';
  if (menuWrapper.children().size() < 4) {
    // 页面打不开了
    shareLink = '已停止访问该网页';
  } else {
    text('复制链接').waitFor();
    sleep(1000);
    const copyButton = text('复制链接')
      .untilFind()
      .get(0);
    utils.superClick(copyButton);
    shareLink = getClip();
    // 有可能部分选项延迟加载，导致再次弹出菜单
    // const copyButton2 = text('复制链接').findOnce();
    // if (copyButton2) {
    //   back();
    //   sleep(500);
    // }
    // // 点一次屏幕以保证清掉菜单
    // click(device.width / 2, device.height / 4);
    // sleep(500);
  }
  back();
  sleep(1000);

  if (currentActivity() !== 'com.tencent.mm.plugin.sns.ui.SnsCommentDetailUI') {
    back();
    sleep(1000);
  }
  return shareLink;
};
