module.exports = {
  /**
   * 找到指定属性的祖先节点
   * @param {Object} obj 给定的 UiObject
   * @param {Object} attr 需要查找的存在特定属性的对象
   * @return {Object} 找到的祖先节点 UiObject
   */
  findParentByAttr(obj, attr) {
    const p = obj.parent();
    if (!p) {
      return null;
    }
    const keys = Object.keys(attr);
    let diffFlag = false;
    keys.forEach((key) => {
      if (attr[key] !== p[key]()) {
        diffFlag = true;
      }
    });
    if (diffFlag) {
      return this.findParentByAttr(p, attr);
    }
    return p;
  },
  superClick(obj) {
    if (obj.clickable()) {
      return obj.click();
    }
    const clickableParent = this.findParentByAttr(obj, {
      clickable: true,
    });
    return clickableParent.click();
  },
};
