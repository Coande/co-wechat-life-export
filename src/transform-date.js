module.exports = (dateString) => {
  // 22:02
  const reg1 = /^\s*(\d+):(\d+)\s*$/;
  const execRes1 = reg1.exec(dateString);
  // 昨天 17:18
  const reg2 = /^\s*昨天\s(\d+):(\d+)\s*$/;
  const execRes2 = reg2.exec(dateString);
  // 2019年5月11日 07:11
  const reg3 = /^\s*(\d+)年(\d+)月(\d+)日 (\d+):(\d+)\s*$/;
  const execRes3 = reg3.exec(dateString);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  if (execRes1) {
    return `${new Date(`${year}/${month}/${date} ${execRes1[1]}:${execRes1[2]}`).getTime()}`;
  } if (execRes2) {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const yesterdayYear = yesterday.getFullYear();
    const yesterdayMonth = yesterday.getMonth() + 1;
    const yesterdayDate = yesterday.getDate();
    return `${new Date(`${yesterdayYear}/${yesterdayMonth}/${yesterdayDate} ${execRes2[1]}:${execRes2[2]}`).getTime()}`;
  }
  return `${new Date(`${execRes3[1]}/${execRes3[2]}/${execRes3[3]} ${execRes3[4]}:${execRes3[5]}`).getTime()}`;
};
