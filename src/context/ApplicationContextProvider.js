import React, { useReducer } from "react";
import ApplicationContext from "./ApplicationContext";

const testValues = [
  {
    name: "Reliance Industries Limited",
    symbol: "RELIANCE",
    quantity: 6,
    price: 1605,
    addedTime: 1588962612090,
    totalPrice: 9630
  },
  {
    name: "Piramal Enterprises Limited",
    symbol: "PEL",
    quantity: 11,
    price: 927,
    addedTime: 1588962612190,
    totalPrice: 10197
  }
];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_STOCK": {
      return [...state, action.payload];
    }
    default:
      throw new Error();
  }
};

const ApplicationContextProvider = ({ children }) => {
  const [portfolioItems, dispatch] = useReducer(reducer, testValues);
  return (
    <ApplicationContext.Provider
      value={{
        portfolioItems,
        dispatch
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
