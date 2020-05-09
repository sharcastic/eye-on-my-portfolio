import React, { useContext, useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { ResponsivePie } from "@nivo/pie";

import Button from "../Components/Button";
import ApplicationContext from "../context/ApplicationContext";
import "../styles/Portfolio.scss";

const Portfolio = () => {
  const { portfolioItems } = useContext(ApplicationContext);
  const [totalValue, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      portfolioItems.reduce(
        (sum, { quantity, price }) => sum + quantity * price,
        0
      )
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
        <ResponsivePie
          pixelRatio={2}
          data={portfolioItems.map(({ symbol, quantity, price }) => ({
            id: symbol,
            value: price * quantity,
            label: symbol
          }))}
          enableRadialLabels
          radialLabelsLinkColor="black"
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          // radialLabel={d => `${d.id}: ${d.value}`}
          sliceLabel={d =>
            `${parseFloat((d.value / totalValue) * 100).toFixed(2)}%`
          }
          tooltip={({ id, value }) => <span>{`${id} -> ${value} Rupees`}</span>}
        />
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
