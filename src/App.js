import React, { useRef, useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";

import { getStockDetails } from "./util/network";
import { DEBOUNCE_WAIT } from "./constants";
import stockData from "./stock_data";
import StockDetailsComponent from "./Components/StockDetails";

import "./styles/App.scss";

function App() {
  const [selectedStock, setSelectedStock] = useState({});
  const [stockDataLoading, setDataLoading] = useState(false);
  const [selectedStockDetails, setStockDetails] = useState({});
  useEffect(() => {
    const retrieveDetails = async symbol => {
      console.log(symbol);
      setDataLoading(true);
      const details = await getStockDetails(symbol);
      if (!details.error) {
        setStockDetails(details);
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
      <header>
        <div className="header-left">
          <h1>STOCK</h1>
          <h1>PORTFOLIO</h1>
        </div>
      </header>
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
        />
      </main>
    </div>
  );
}

export default App;
