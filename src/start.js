const utils = require('./utils.js');
const detailsOP = require('./details-op.js');
const controlMap = require('./control-map.js');
const db = require('./save-to-db.js');
const constant = require('./constant.js');

function getIsReachEnd() {
  if (id(controlMap.bottomLine).findOnce()) {
    return true;
  }
  return false;
}

module.exports = (filterLifeStartTime, filterLifeEndTime) => () => {
  // 请求截图
  if (!requestScreenCapture()) {
    toastLog('请求截图失败，需要截图权限');
    exit();
  }

  try {
    auto();
  } catch (error) {
    toastLog('请先打开无障碍再试');
    exit();
  }

  // eslint-disable-next-line no-alert
  alert('提示', '请保持当前软件后台运行，并切换微信，打开朋友圈个人页面');

  waitForActivity('com.tencent.mm.plugin.sns.ui.SnsUserUI');

  let currentIndex;
  let reachEndType = -1;
  while (reachEndType < 1) {
    // 朋友圈的每一个内容条目
    const list = id(controlMap.listViewId)
      .findOnce()
      .children();

    // eslint-disable-next-line no-loop-func
    list.forEach((item) => {
      if (reachEndType > 1 || reachEndType === 1) {
        return;
      }
      const currentRow = item.row();
      if (currentRow < currentIndex || currentRow === currentIndex) {
        // console.log('当前item为重复item：', currentRow);
        return;
      }
      currentIndex = currentRow;
      const pictureIcon = item.findOne(id(controlMap.pictureIcon));
      const shareWrapper = item.findOne(id(controlMap.shareWrapper));
      const foundObj = pictureIcon || shareWrapper;
      if (foundObj) {
        const clickResult = utils.superClick(foundObj);

        if (clickResult) {
          if (pictureIcon) {
            waitForActivity('com.tencent.mm.plugin.sns.ui.SnsGalleryUI');
          } else {
            waitForActivity('com.tencent.mm.plugin.sns.ui.SnsCommentDetailUI');
          }
          const res = detailsOP({
            row: currentRow,
            filterLifeStartTime,
            filterLifeEndTime,
          });
          if (res.isFinish) {
            reachEndType = 1;
          }
        } else {
          console.error('第', currentIndex, '个item点击结果：', clickResult);
        }
      } else {
        console.log('第', currentIndex, '个item不是目标item');
      }
    });

    const lastItem = list.get(list.size() - 1);
    sleep(500);
    swipe(0, lastItem.bounds().top, 0, 0, 2000);
    sleep(500);
    if (getIsReachEnd()) {
      reachEndType += 1;
    }
  }
  db.close();
  alert('提示', `恭喜，导出完毕！导出的数据位于：${constant.appDir}`);
};
