export const getCurrencyAB = str => {
  const db = JSON.parse(localStorage.getItem('db'));

  if (str) {
    return db.allAlfaBank.find(el => el.sellIso == str);
  }

  return db;
};