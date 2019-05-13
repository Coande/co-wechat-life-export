'ui';

const start = require('./dist/start.js');

ui.layout(
  <vertical padding="16">
    <text textSize="16sp" textColor="black" text="请输入姓名" />
    <input id="name" text="小明" />
    <button id="ok" text="确定" />
  </vertical>
);
// 指定确定按钮点击时要执行的动作
ui.ok.click(() => {
  // 通过getText()获取输入的内容
  const name = ui.name.getText();
  toast(name + '，您好!');
  threads.start(start);
});
