import { TWELVEDATA_API_KEY, TWELVEDATA_URL } from "../constants";

const getThisAndPreviousDate = () => {
  const date = new Date();
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }

  if (day.length < 2) {
    day = "0" + day;
  }

  return [[year - 1, month, day].join("-"), [year, month, day].join("-")];
};

const getStockDetailsPromise = symbol =>
  fetch(`${TWELVEDATA_URL}/quote?symbol=${symbol}&apikey=${TWELVEDATA_API_KEY}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => ({ error: true, errObj: err }));

const getStockChartDataPromise = symbol => {
  const [startDate, endDate] = getThisAndPreviousDate();
  return fetch(
    `${TWELVEDATA_URL}/time_series?symbol=${symbol}&interval=1day&start_date=${startDate}&end_date=${endDate}&exchange=NSE&apikey=${TWELVEDATA_API_KEY}`
  )
    .then(res => res.json())
    .then(data => data)
    .catch(err => ({ error: true, errObj: err }));
};

export const getStockDetailsAndChart = symbol => {
  const detailsPromise = getStockDetailsPromise(symbol);
  const chartDataPromise = getStockChartDataPromise(symbol);
  return Promise.all([detailsPromise, chartDataPromise])
    .then(([details, chartData]) => ({ details, chartData: chartData.values }))
    .catch(err => ({ error: true, errObj: err }));
};
