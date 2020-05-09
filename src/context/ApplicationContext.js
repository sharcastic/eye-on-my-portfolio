import { createContext } from "react";

const AppliationContext = createContext({
  portfolioItems: [],
  dispatch: () => {}
});

export default AppliationContext;
