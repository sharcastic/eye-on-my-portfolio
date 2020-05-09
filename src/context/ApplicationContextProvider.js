import React, { useReducer } from "react";
import ApplicationContext from "./ApplicationContext";

const testValues = [
  {
    name: "MACPOWER CNC MACHI",
    symbol: "MACPOWER.SM",
    quantity: 1,
    price: 35.75
  },
  { name: "Yes Bank Limited", symbol: "YESBANK", quantity: 1, price: 27.05 }
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
  const [portfolioItems, dispatch] = useReducer(reducer, []);
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
