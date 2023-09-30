import React, { useEffect, useState } from "react";
import { StockItem, StockItems } from "../@types";

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

  const getStock = async (): Promise<StockItems> =>
    fetch("/api/dbase", { method: "GET" }).then(
      async (response) => await response.json()
    );

  const refresh = async (): Promise<void> => {
    const stock = await getStock();
    setStockItems(stock);
  };

  const add = ({
    name,
    manufacturer,
    stockLevel,
  }: StockItem): Promise<Response> =>
    fetch("/api/dbase", {
      method: "PUT",
      headers,
      body: JSON.stringify({ name, manufacturer, stockLevel }),
    });

  const edit = async (
    id: number,
    { name, manufacturer, stockLevel }: StockItem
  ): Promise<Response> =>
    fetch("/api/dbase", {
      method: "PUT",
      headers,
      body: JSON.stringify({ id, name, manufacturer, stockLevel }),
    });

  const remove = async (id: number): Promise<Response> =>
    fetch("/api/dbase", {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    });

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
