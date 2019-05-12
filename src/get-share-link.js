const utils = require('./utils.js');

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
  text('复制链接').waitFor();
  sleep(1000);
  const copyButton = text('复制链接')
    .untilFind()
    .get(0);
  utils.superClick(copyButton);
  const shareLink = getClip();
  // 有可能部分选项延迟加载，导致再次弹出菜单
  // const copyButton2 = text('复制链接').findOnce();
  // if (copyButton2) {
  //   back();
  //   sleep(500);
  // }
  // // 点一次屏幕以保证清掉菜单
  // click(device.width / 2, device.height / 4);
  // sleep(500);
  back();
  sleep(1000);
  if (currentActivity() !== 'com.tencent.mm.plugin.sns.ui.SnsCommentDetailUI') {
    console.log('currentActivity==', currentActivity());
    back();
    sleep(1000);
  }
  return shareLink;
};
