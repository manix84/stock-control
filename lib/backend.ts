import { StockItem, StockItems } from "../@types";

const basePath = process.env.basePath || "";

const headers = {
  "Content-Type": "application/json",
};

export const get = async (): Promise<StockItems> =>
  fetch(`${basePath}/api/dbase`, { method: "GET" }).then(
    async (response) => await response.json()
  );

export const add = ({
  name,
  manufacturer,
  stockLevel,
}: StockItem): Promise<Response> =>
  fetch(`${basePath}/api/dbase`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ name, manufacturer, stockLevel }),
  });

export const edit = async (
  id: number,
  { name, manufacturer, stockLevel }: StockItem
): Promise<Response> =>
  fetch(`${basePath}/api/dbase`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ id, name, manufacturer, stockLevel }),
  });

export const remove = async (id: number): Promise<Response> =>
  fetch(`${basePath}/api/dbase`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ id }),
  });
