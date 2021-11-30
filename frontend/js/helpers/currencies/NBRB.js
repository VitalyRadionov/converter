export const getCurrency = str => {
  const db = JSON.parse(localStorage.getItem('db'));

  if (str) {
    return Object.assign(db.dir.find(el => el.Cur_Abbreviation == str), db.daily.find(el => el.Cur_Abbreviation == str), db.monthly.find(el => el.Cur_Abbreviation == str));
  }

  return db;
};