import React, { useState, useContext } from "react";
import Loader from "react-loader-spinner";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";
import { useToasts } from "react-toast-notifications";
import { navigate } from "@reach/router";

import Button from "./Button";
import BasicStockChart from "./Charts/BasicStockChart";
import ApplicationContext from "../context/ApplicationContext";
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
  const [quantity, setQuantity] = useState("");
  const [confirmPrice, setConfirmPrice] = useState("");
  const { addToast } = useToasts();
  const { dispatch } = useContext(ApplicationContext);

  if (!name) {
    return null;
  }
  const price = parseFloat(close).toFixed(2);
  const displayChange = parseFloat(change).toFixed(2);
  const displayPercent = parseFloat(percent_change).toFixed(2);
  const yearLow = parseFloat(low).toFixed(2);
  const yearHigh = parseFloat(high).toFixed(2);
  const yearLowPercent = parseFloat(low_change_percent).toFixed(2);
  const yearHighPercent = parseFloat(high_change_percent).toFixed(2);
  const indicatingClass = change < 0 ? "down" : "up";

  const onInputChange = field => ({ target: { value } }) => {
    if (field === "quantity") {
      if (/^\d+$/.test(value)) {
        setQuantity(parseInt(value, 10));
      } else if (value === "") {
        setQuantity("");
      }
    } else if (field === "price") {
      if (/^-?\d+\.?\d*$/.test(value)) {
        setConfirmPrice(parseFloat(value));
      } else if (value === "") {
        setConfirmPrice("");
      }
    }
  };
  const closePopup = () => {
    setConfirmPrice("");
    setQuantity("");
    setShowPopup(false);
  };
  const onConfirmClick = () => {
    const price =
      confirmPrice === "" ? parseFloat(price) : parseFloat(confirmPrice);
    dispatch({
      type: "ADD_STOCK",
      payload: {
        name,
        symbol,
        quantity: quantity === "" ? 1 : parseInt(quantity, 10),
        price,
        addedTime: new Date().getTime(),
        totalPrice: quantity * price
      }
    });
    addToast(`Added ${symbol} to your Portfolio!`, { appearance: "success" });
    setQuantity("");
    setConfirmPrice("");
    closePopup();
  };
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
          <BasicStockChart data={stockChartData} id={name} />
          <div className="button-section">
            <Button className="add" onClick={() => setShowPopup(true)}>
              Add to Portfolio!
            </Button>
            <Button className="view" onClick={() => navigate("/portfolio")}>
              View Portfolio!
            </Button>
          </div>
          <Modal onCloseClick={closePopup} show={showPopup}>
            <h4>Add to your Portfolio!</h4>
            <div className="form">
              <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                  name="quantity"
                  value={quantity}
                  onChange={onInputChange("quantity")}
                  placeholder={1}
                />
              </div>
              <div>
                <label htmlFor="price">Buy Price</label>
                <input
                  name="price"
                  placeholder={price}
                  value={confirmPrice}
                  onChange={onInputChange("price")}
                />
              </div>
              <Button className="confirm" onClick={onConfirmClick}>
                Add Stock!
              </Button>
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
