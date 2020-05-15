import React from "react";
import { ResponsivePie } from "@nivo/pie";

const SimplePieChart = ({ portfolioItems, totalValue }) => {
  return (
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
      sliceLabel={d =>
        `${parseFloat((d.value / totalValue) * 100).toFixed(2)}%`
      }
      tooltip={({ id, value }) => <span>{`${id} -> ${value} Rupees`}</span>}
    />
  );
};

export default SimplePieChart;
