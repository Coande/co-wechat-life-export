const controlMap = require('./control-map.js');

module.exports = () => {
  const someCanSee = id(controlMap.someCanSee).findOnce();
  if (someCanSee) {
    someCanSee.click();
    const titleCom = textMatches(/^该照片.?可见的朋友$/)
      .untilFind()
      .get(0);

    const itemNameList = [];
    let reachEndTimes = 0;
    let lastRow;
    // 连续三次到底判断为真的到底了
    while (reachEndTimes !== 3) {
      console.log('等待list');
      const someCanSeeListCom = id(controlMap.someCanSeeList)
        .untilFind()
        .get(0);
      const itemList = someCanSeeListCom.children();
      // eslint-disable-next-line no-loop-func
      let hasNew = false;
      itemList.forEach((item) => {
        const currentRow = item.row();
        if (currentRow < lastRow || currentRow === lastRow) {
          return;
        }
        hasNew = true;
        lastRow = currentRow;
        const itemNameCom = item.findOne(id(controlMap.someCanSeeItemName));
        itemNameList.push(itemNameCom.text());
      });
      if (!hasNew) {
        reachEndTimes++;
      } else {
        reachEndTimes = 0;
      }
      scrollDown();
      sleep(500);
    }
    if (titleCom) {
      back();
      sleep(500);
      return {
        type: titleCom.text(),
        list: itemNameList,
      };
    }
  }
  return '';
};
