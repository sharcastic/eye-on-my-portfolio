import React from "react";
import { Router } from "@reach/router";

import ApplicationContextProvider from "./context/ApplicationContextProvider";
import App from "./pages/App";
import Portfolio from "./pages/Portfolio";

export default () => {
  return (
    <ApplicationContextProvider>
      <header>
        <div className="header-left">
          <h1>STOCK</h1>
          <h1>PORTFOLIO</h1>
        </div>
      </header>
      <Router>
        <App path="/" />
        <Portfolio path="/portfolio" />
      </Router>
    </ApplicationContextProvider>
  );
};
