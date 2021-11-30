export const getDate = () => {
  let soon = new Date();


  const fullDate = {
    yer: soon.getFullYear(),
    month: soon.getMonth(),
    date: soon.getDate()
  };

  switch (fullDate.month) {
    case 0:
      return fullDate.date.toString() + ' января ' + fullDate.yer.toString();
    case 1:
      return fullDate.date.toString() + ' февраля ' + fullDate.yer.toString();
    case 2:
      return fullDate.date.toString() + ' марта ' + fullDate.yer.toString();
    case 3:
      return fullDate.date.toString() + ' апреля ' + fullDate.yer.toString();
    case 4:
      return fullDate.date.toString() + ' мая ' + fullDate.yer.toString();
    case 5:
      return fullDate.date.toString() + ' июня ' + fullDate.yer.toString();
    case 6:
      return fullDate.date.toString() + ' июля ' + fullDate.yer.toString();
    case 7:
      return fullDate.date.toString() + ' августа ' + fullDate.yer.toString();
    case 8:
      return fullDate.date.toString() + ' сентября ' + fullDate.yer.toString();
    case 9:
      return fullDate.date.toString() + ' октября ' + fullDate.yer.toString();
    case 10:
      return fullDate.date.toString() + ' ноября ' + fullDate.yer.toString();
    case 11:
      return fullDate.date.toString() + ' декабря ' + fullDate.yer.toString();
    default:
      break;
  }

};