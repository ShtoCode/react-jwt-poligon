import { createContext, useState } from "react";

const StockContext = createContext();

const StockProvider = ({ children }) => {
  const [symbol, setSymbol] = useState(null);
  const updateSymbol = (newSymbol) => {
    setSymbol(newSymbol);
  }

  return (
    <StockContext.Provider value={{ symbol, updateSymbol }}>
      {children}
    </StockContext.Provider>
  )

}


export { StockContext, StockProvider };

