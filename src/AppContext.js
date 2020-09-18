import React from "react";
import { useLocalStore } from "mobx-react";
import { criarCarrinhoStore } from "./Stores/CarrinhoStore";

const AppContext = React.createContext(criarCarrinhoStore());

export const AppProvider = ({ children }) => {
  const carrinhoStore = useLocalStore(criarCarrinhoStore);

  return (
    <AppContext.Provider value={carrinhoStore}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
