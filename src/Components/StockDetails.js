import React from "react";
import Loader from "react-loader-spinner";
import clsx from "clsx";

import "../styles/StockDetails.scss";

const StockDetails = ({ name, symbol, details, loading }) => {
  const { close, change, percent_change } = details;
  if (!name) {
    return null;
  }
  const price = parseFloat(close).toFixed(2);
  const displayChange = parseFloat(change).toFixed(2);
  const displayPercent = parseFloat(percent_change).toFixed(2);
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
