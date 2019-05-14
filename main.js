'ui';

const start = require('./dist/start.js');
const db = require('./dist/save-to-db.js');

ui.layout(
  <vertical>
      <horizontal>
        <text text="起始时间: "/>
        <input id="sy" hint="年" inputType="number" layout_weight="4" maxLength="4"/><text text="/"/>
        <input id="sm" hint="月" inputType="number" layout_weight="2" maxLength="2"/><text text="/"/>
        <input id="sd" hint="日" inputType="number" layout_weight="2" maxLength="2"/>
        <input id="sh" hint="时" inputType="number" layout_weight="2" maxLength="2"/><text text=":"/><input id="sm2" hint="分" inputType="number" layout_weight="2" maxLength="2"/>
      </horizontal>
      <horizontal>
        <text  text="结束时间: "/>
        <input id="ey" hint="年" inputType="number" layout_weight="4" maxLength="4"/><text text="/"/>
        <input id="em" hint="月" inputType="number" layout_weight="2" maxLength="2"/><text text="/"/>
        <input id="ed" hint="日" inputType="number" layout_weight="2" maxLength="2"/>
        <input id="eh" hint="时" inputType="number" layout_weight="2" maxLength="2"/><text text=":"/><input id="em2" hint="分" inputType="number" layout_weight="2" maxLength="2"/>
      </horizontal>

      <button id="startButton" text="开始"/>
      <list id="list">
          <horizontal>
              <vertical>
                <text id="lifeStartTime" text="动态起始时间: {{lifeStartTime}}"/>
                <text id="lifeEndTime" text="动态结束时间: {{lifeEndTime}}"/>
                <text id="runStartTime" text="执行起始时间: {{runStartTime}}"/>
                <text id="runEndTime" text="执行结束时间: {{runEndTime}}"/>
                <text id="lifeCount" text="动态条数: {{lifeCount}}"/>
              </vertical>
              <button id="deleteItem" text="删除"/>
          </horizontal>
      </list>
  </vertical>
);
// var items = [
//   {runSeq: 1, lifeStartTime: "2019/5/14 14:17", lifeEndTime: "2019/5/14 14:19", runStartTime: "2019/5/14 14:20", runEndTime: "2019/5/14 14:24", lifeCount: '4'},
//   {runSeq: 2, lifeStartTime: "2019/5/14 14:17", lifeEndTime: "2019/5/14 14:19", runStartTime: "2019/5/14 14:20", runEndTime: "2019/5/14 14:24", lifeCount: '4'},
//   {runSeq: 3, lifeStartTime: "2019/5/14 14:17", lifeEndTime: "2019/5/14 14:19", runStartTime: "2019/5/14 14:20", runEndTime: "2019/5/14 14:24", lifeCount: '4'},
//   {runSeq: 4, lifeStartTime: "2019/5/14 14:17", lifeEndTime: "2019/5/14 14:19", runStartTime: "2019/5/14 14:20", runEndTime: "2019/5/14 14:24", lifeCount: '4'},
//   {runSeq: 5, lifeStartTime: "2019/5/14 14:17", lifeEndTime: "2019/5/14 14:19", runStartTime: "2019/5/14 14:20", runEndTime: "2019/5/14 14:24", lifeCount: '4'},
//   {runSeq: 6, lifeStartTime: "2019/5/14 14:17", lifeEndTime: "2019/5/14 14:19", runStartTime: "2019/5/14 14:20", runEndTime: "2019/5/14 14:24", lifeCount: '4'}
// ];
const items = db.getHistory();

ui.list.setDataSource(items);

(function initForm() {
  const st = new Date('2011/1/21');
  const et = new Date();
  ui.sy.setText(st.getFullYear() + '');
  ui.sm.setText((st.getMonth() + 1) + '');
  ui.sd.setText(st.getDate() + '');
  ui.sh.setText(st.getHours() + '');
  ui.sm2.setText(st.getMinutes() + '');

  ui.ey.setText(et.getFullYear() + '');
  ui.em.setText((et.getMonth() + 1) + '');
  ui.ed.setText(et.getDate() + '');
  ui.eh.setText(et.getHours() + '');
  ui.em2.setText(et.getMinutes() + '');

})();

ui.startButton.click(() => {
  const st = new Date(ui.sy.getText() + "/" + ui.sm.getText() + "/" + ui.sd.getText() + " " + ui.sh.getText() + ":" + ui.sm2.getText()).getTime();
  const et = new Date(ui.ey.getText() + "/" + ui.em.getText() + "/" + ui.ed.getText() + " " + ui.eh.getText() + ":" + ui.em2.getText()).getTime();
  if (isNaN(st)) {
    toastLog('起始时间填写错误')
    return;
  }
  if (isNaN(et)) {
    toastLog('结束时间填写错误')
    return;
  }
  threads.start(start(st, et));
});

ui.list.on("item_bind", function(itemView, itemHolder){
  itemView.deleteItem.on("click", function(){
    confirm("确定删除吗").then(value=>{
        //当点击确定后会执行这里, value为true或false, 表示点击"确定"或"取消"
        if (value) {
          let item = itemHolder.item;
          const deleteResult = db.deleteHistory(item.runSeq);
          if (deleteResult > 0) {
            items.splice(itemHolder.position, 1);
            toastLog('删除成功');
          } else {
            toastLog('删除失败');
          }
        }
    });
  });
})