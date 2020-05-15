import { TWELVEDATA_API_KEY, TWELVEDATA_URL } from "../constants";
import { getTodayAndLastYearsDate, getDateString } from "./commonFunctions";

const getStockDetailsPromise = symbol =>
  fetch(`${TWELVEDATA_URL}/quote?symbol=${symbol}&apikey=${TWELVEDATA_API_KEY}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => ({ error: true, errObj: err }));

const getStockChartDataPromise = symbol => {
  const [startDate, endDate] = getTodayAndLastYearsDate();
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

export const getMultipleStockData = (arrOfSymbols, timeToGetDataFrom) => {
  const arrString = arrOfSymbols.reduce(
    (acc, symbol) => (acc ? `${acc},${symbol}` : symbol),
    ""
  );
  return fetch(
    `${TWELVEDATA_URL}/time_series?symbol=${arrString}&interval=1day&start_date=${getDateString(
      new Date(timeToGetDataFrom)
    )}&end_date=${getDateString()}&exchange=NSE&apikey=${TWELVEDATA_API_KEY}`
  )
    .then(res => res.json())
    .then(data => data)
    .catch(err => ({ error: true, errObj: err }));
};
