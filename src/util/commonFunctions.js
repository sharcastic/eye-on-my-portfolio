export const getDateString = (date = new Date()) => {
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }

  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

export const getTodayAndLastYearsDate = () => {
  const todaysDate = new Date();
  const lastYearsDate = new Date();
  lastYearsDate.setFullYear(lastYearsDate.getFullYear() - 1);

  return [getDateString(lastYearsDate), getDateString(todaysDate)];
};
