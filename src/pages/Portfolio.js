import React, { useContext, useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { ResponsiveLine } from "@nivo/line";

import { getMultipleStockData } from "../util/network";
import Button from "../Components/Button";
import ApplicationContext from "../context/ApplicationContext";
import SimplePieChart from "../Components/Charts/BasicPieChart";
import "../styles/Portfolio.scss";

const Portfolio = () => {
  const { portfolioItems } = useContext(ApplicationContext);
  const [graphData, setGraphData] = useState([]);
  const [totalValue, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async (arrOfSymbols, timeToGetDataFrom) => {
      const data = await getMultipleStockData(arrOfSymbols, timeToGetDataFrom);
      const formattedData = arrOfSymbols.map(symbol => {
        const { quantity = 0 } = portfolioItems.find(i => i.symbol === symbol);
        return {
          id: symbol,
          data: data[symbol].values.reverse().map(i => ({
            x: i.datetime,
            y: i.close * quantity
          }))
        };
      });
      setGraphData(formattedData);
    };
    const [total, lastAddedStockTime] = portfolioItems.reduce(
      ([sum, minTime], { totalPrice, addedTime }) => [
        sum + totalPrice,
        minTime > addedTime ? addedTime : minTime
      ],
      [0, Infinity]
    );
    setTotal(total);
    fetchData(
      portfolioItems.map(i => i.symbol),
      lastAddedStockTime
    );
  }, [portfolioItems]);
  if (portfolioItems.length === 0) {
    return (
      <div>
        <p>There are no stocks in your portfolio.</p>
        <Button className="addStocks" onClick={() => navigate("/")}>
          Add Stocks
        </Button>
      </div>
    );
  }
  return (
    <div>
      <h4>This is the Portfolio page!</h4>
      <div className="pie">
        <SimplePieChart
          portfolioItems={portfolioItems}
          totalValue={totalValue}
        />
      </div>
      <div className="stackedLineChart">
        {graphData.length === 0 ? (
          <span>LOADING!</span>
        ) : (
          <ResponsiveLine
            data={graphData}
            yScale={{
              type: "linear",
              min: Math.min(...portfolioItems.map(i => i.totalPrice)) * 0.75
            }}
          />
        )}
      </div>
      <ul>
        {portfolioItems.map(({ symbol, quantity, price }) => (
          <li key={symbol}>
            {symbol} - {price} - {quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
