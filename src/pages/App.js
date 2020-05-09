import React, { useRef, useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import { navigate } from "@reach/router";

import Button from "../Components/Button";
import { getStockDetailsAndChart } from "../util/network";
import { DEBOUNCE_WAIT } from "../constants";
import stockData from "../stock_data";
import StockDetailsComponent from "../Components/StockDetails";

import "../styles/App.scss";

function App() {
  const [selectedStock, setSelectedStock] = useState({});
  const [stockDataLoading, setDataLoading] = useState(false);
  const [stockChartData, setChartData] = useState([]);
  const [selectedStockDetails, setStockDetails] = useState({});
  useEffect(() => {}, []);
  useEffect(() => {
    const retrieveDetails = async symbol => {
      setDataLoading(true);
      const data = await getStockDetailsAndChart(symbol);
      console.log(data);
      if (!data.error) {
        setStockDetails(data.details);
        setChartData(data.chartData.map(i => ({ x: i.datetime, y: i.close })));
        setDataLoading(false);
      }
      // ERROR CASE!
    };
    if (selectedStock.name) {
      retrieveDetails(selectedStock.symbol);
    }
  }, [selectedStock]);
  const promiseOptions = async inputValue => {
    return filterStocks(inputValue);
  };
  const debounceObj = useRef(debounce(promiseOptions, DEBOUNCE_WAIT));
  const loadOptions = inputValue => {
    return debounceObj.current(inputValue);
  };
  const filterStocks = inputValue => {
    return stockData.filter(
      i =>
        i.name.toLowerCase().startsWith(inputValue.toLowerCase()) ||
        i.symbol.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  };
  const onSelectChange = (obj, { action }) => {
    if (action === "select-option") {
      setSelectedStock(obj);
    }
  };
  return (
    <div className="App">
      <main>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onChange={onSelectChange}
          formatOptionLabel={option => `${option.symbol} - ${option.name}`}
          placeholder="Select a stock"
        />
        <StockDetailsComponent
          details={selectedStockDetails}
          loading={stockDataLoading}
          name={selectedStock.name}
          symbol={selectedStock.symbol}
          stockChartData={stockChartData}
        />
        {!selectedStock.name && (
          <Button
            className="goToPortolio"
            onClick={() => navigate("/portfolio")}
          >
            Check out Portfolio!
          </Button>
        )}
      </main>
    </div>
  );
}

export default App;
