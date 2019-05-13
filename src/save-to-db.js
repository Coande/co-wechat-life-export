const constant = require('./constant.js');

const dbWrapper = (() => {
  // console.log('打开/创建数据库实例');
  const db = sqlite.open(
    `${constant.appDir}/data.db`,
    { version: 1 },
    {
      onOpen(dbInstant) {
        dbInstant.execSQL(
          // eslint-disable-next-line no-multi-str
          '\
        CREATE TABLE IF NOT EXISTS wechatLife(\
          `id` INTEGER PRIMARY KEY AUTOINCREMENT,\
          `row` INTEGER NOT NULL,\
          `desc` TEXT,\
          `picture` TEXT,\
          `video` TEXT,\
          `shareTitle` TEXT,\
          `shareLink` TEXT,\
          `shareFrom` TEXT,\
          `sendTime` TEXT,\
          `sendLocation` TEXT,\
          `sendLocationShow` TEXT,\
          `someCanSeeType` TEXT,\
          `someCanSeeList` TEXT,\
          `isPrivate` INTEGER,\
          `createdAt` TEXT\
        )\
      ',
        );
      },
    },
  );
  return {
    getDB() {
      return db;
    },
    insert(data) {
      // const insertResult = db.insert('wechatLife', {
      //   row: 1,
      //   desc: '测试测试',
      //   picture: '["a.png", "b.png"]',
      //   video: 'c.mp4',
      //   shareTitle: '测试链接标题',
      //   shareLink: 'https://e12e.com',
      //   shareFrom: 'co',
      //   sendTime: '2019年5月10日',
      //   sendLocation: '珠海',
      //   sendLocationShow: 'd.png',
      //   isSomeCanSee: 1,
      //   isPrivate: 0,
      //   createdAt: '0000000000'
      // });
      console.info('将要插入：\n', data);
      const insertResult = db.insert('wechatLife', data);
      console.log('insertResult：', insertResult);
    },
    close() {
      db.close();
    },
  };
})();

module.exports = dbWrapper;

// const insertResult = dbWrapper.insert({
//   row: 1,
//   desc: '测试测试',
//   picture: '["a.png", "b.png"]',
//   video: 'c.mp4',
//   shareTitle: '测试链接标题',
//   shareLink: 'https://e12e.com',
//   shareFrom: 'co',
//   sendTime: '2019年5月10日',
//   sendLocation: '珠海',
//   sendLocationShow: 'd.png',
//   isSomeCanSee: 1,
//   isPrivate: 0,
//   createdAt: '0000000000'
// });
