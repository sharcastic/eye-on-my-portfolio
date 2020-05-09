import React from "react";
import { ResponsiveLineCanvas } from "@nivo/line";

const BasicStockChart = ({ id, data }) => (
  <div className="chart">
    <ResponsiveLineCanvas
      data={[
        {
          id,
          data
        }
      ]}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      enableArea
      enableGridX={false}
      enableGridY={false}
      axisRight={{
        orient: "right",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: 5
      }}
      yScale={{ type: "linear" }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        precision: "day"
      }}
      xFormat="time:%Y-%m-%d"
      enableSlices="x"
      enableCrosshair={true}
      enablePoints={false}
      axisLeft={{
        orient: "left",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: 5
      }}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 2 months",
        legend: "time scale",
        legendOffset: -12
      }}
      tooltip={({
        point: {
          data: { x, y }
        }
      }) => (
        <span
          style={{
            backgroundColor: "white",
            padding: "10px",
            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.5)"
          }}
        >
          Price on {x.toDateString()} was {y}
        </span>
      )}
    />
  </div>
);

export default BasicStockChart;
