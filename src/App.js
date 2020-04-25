import React, { useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";

import { DEBOUNCE_WAIT } from "./constants";

import "./styles/App.scss";
import stockData from "./stock_data";

function App() {
  const [selectedStock, setSelectedStock] = useState({});
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
          <span>STOCK</span>
          <span>PORTFOLIO</span>
        </div>
      </header>
      <main>
        <div>Portfolio app or whatever this is!</div>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onChange={onSelectChange}
          formatOptionLabel={option => `${option.symbol} - ${option.name}`}
        />
        <div>
          {selectedStock.name && (
            <div>
              {selectedStock.name} - {selectedStock.exchange}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
