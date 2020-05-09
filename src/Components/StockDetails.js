import React, { useState } from "react";
import Loader from "react-loader-spinner";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";
import { ResponsiveLineCanvas } from "@nivo/line";
import { useToasts } from "react-toast-notifications";

import Modal from "./Modal";
import "../styles/StockDetails.scss";

const StockDetails = ({ name, symbol, details, loading, stockChartData }) => {
  const {
    close,
    change,
    percent_change,
    fifty_two_week: { low, high, low_change_percent, high_change_percent } = {}
  } = details;
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState();
  const [confirmPrice, setConfirmPrice] = useState();
  const { addToast } = useToasts();

  if (!name) {
    return null;
  }
  const onInputChange = field => ({ target: value }) => {
    if (!!parseInt(value, 10)) {
      if (field === "quantity") {
        setQuantity(value);
      } else {
        setConfirmPrice(value);
      }
    }
  };
  const closePopup = () => setShowPopup(false);
  const onConfirmClick = () => {
    addToast(`Added ${symbol} to your Portfolio!`, { appearance: "success" });
    setQuantity();
    setConfirmPrice();
    closePopup();
  };
  const price = parseFloat(close).toFixed(2);
  const displayChange = parseFloat(change).toFixed(2);
  const displayPercent = parseFloat(percent_change).toFixed(2);
  const yearLow = parseFloat(low).toFixed(2);
  const yearHigh = parseFloat(high).toFixed(2);
  const yearLowPercent = parseFloat(low_change_percent).toFixed(2);
  const yearHighPercent = parseFloat(high_change_percent).toFixed(2);
  const indicatingClass = change < 0 ? "down" : "up";
  return (
    <div className="details">
      <div className="details__header">
        <div>
          <span className="stock-name">{name}</span>
          <span className="stock-symbol">[{symbol}]</span>
        </div>
      </div>
      {!loading ? (
        <div className="details__info">
          <div className="details__info__currentPrice">
            <span
              className={clsx([
                "details__info__currentPrice__price",
                indicatingClass
              ])}
            >
              {price}
            </span>
            <div
              className={clsx([
                "details__info__currentPrice__change",
                indicatingClass
              ])}
            >
              <span className={`${indicatingClass}-arrow`} />
              <span>{displayChange}</span>
            </div>

            <span
              className={clsx([
                "details__info__currentPrice__percentChange",
                indicatingClass
              ])}
            >
              ({displayPercent}%)
            </span>
          </div>
          <div className="details__info__year-peaks">
            <div className="details__info__year-peaks__low">
              <span className="details__info__year-peaks__low__value">
                {yearLow}
              </span>
              <span
                className="details__info__year-peaks__low__text"
                data-tip
                data-for="year-low"
              >
                52 week low
              </span>
              <ReactTooltip id="year-low" type="dark" place="top">
                <span>Current price is higher by {yearLowPercent}%</span>
              </ReactTooltip>
            </div>
            <span>-</span>
            <div className="details__info__year-peaks__high">
              <span className="details__info__year-peaks__high__value">
                {yearHigh}
              </span>
              <span
                className="details__info__year-peaks__high__text"
                data-tip
                data-for="year-high"
              >
                52 week high
              </span>
              <ReactTooltip id="year-high" type="dark" place="top">
                <span>Current price is lesser by {yearHighPercent}%</span>
              </ReactTooltip>
            </div>
          </div>
          <div className="chart">
            <ResponsiveLineCanvas
              data={[
                {
                  id: name,
                  data: stockChartData
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
          <div className="button-section">
            <button className="add" onClick={() => setShowPopup(true)}>
              Add to Portfolio!
            </button>
            <button className="view">View Portfolio!</button>
          </div>
          <Modal onCloseClick={closePopup} show={showPopup}>
            <h4>Add to your Portfolio!</h4>
            <div className="form">
              <div>
                <label for="quantity">Quantity</label>
                <input
                  name="quantity"
                  value={quantity}
                  onChange={onInputChange("quantity")}
                  placeholder={1}
                />
              </div>
              <div>
                <label for="price">Buy Price</label>
                <input
                  name="price"
                  placeholder={price}
                  value={confirmPrice}
                  onChange={onInputChange("price")}
                />
              </div>
              <button className="confirm" onClick={onConfirmClick}>
                Add Stock!
              </button>
            </div>
          </Modal>
        </div>
      ) : (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={80}
          width={80}
          className="loader"
        />
      )}
    </div>
  );
};

export default StockDetails;
