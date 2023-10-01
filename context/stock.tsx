import React, { useEffect, useState } from "react";
import { StockItem, StockItems } from "../@types";
import { add, edit, get, remove } from "../lib/backend";

type StockContextProps = {
  stock: StockItems;
  add: ({ name, manufacturer, stockLevel }: StockItem) => Promise<Response>;
  edit: (
    id: number,
    { name, manufacturer, stockLevel }: StockItem
  ) => Promise<Response>;
  remove: (id: number) => Promise<Response>;
  refresh: () => Promise<void>;
  isLoaded: boolean;
};

export const stockContext = React.createContext<StockContextProps>({
  stock: [],
  add: async () => fetch(""),
  edit: async () => fetch(""),
  remove: async () => fetch(""),
  refresh: async () => {},
  isLoaded: false,
});

export const StockProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [stockItems, setStockItems] = useState<StockItems>([]);
  const headers = {
    "Content-Type": "application/json",
  };

  const refresh = async (): Promise<void> => {
    const stock = await get();
    setStockItems(stock);
  };

  useEffect(() => {
    refresh();
    setIsLoaded(true);
  }, []);

  return (
    <stockContext.Provider
      value={{ stock: stockItems, add, edit, remove, refresh, isLoaded }}
    >
      {children}
    </stockContext.Provider>
  );
};
export default StockProvider;
