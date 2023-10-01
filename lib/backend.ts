import { StockItem, StockItems } from "../@types";

const basePath = process.env.basePath || "";

const headers = {
  "Content-Type": "application/json",
};

export const request = (
  url: RequestInfo | URL,
  options?: RequestInit
): Promise<Response> =>
  fetch(typeof url === "string" ? `${basePath}${url}` : url, options).then(
    (response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`[${response.status}] ${response.statusText}`);
    }
  );

export const get = async (): Promise<StockItems> =>
  request(`/api/dbase`, { method: "GET" }).then(
    async (response) => await response.json()
  );

export const add = ({
  name,
  manufacturer,
  stockLevel,
}: StockItem): Promise<Response> =>
  request(`/api/dbase`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ name, manufacturer, stockLevel }),
  }).then(async (response) => await response.json());

export const edit = async (
  id: number,
  { name, manufacturer, stockLevel }: StockItem
): Promise<Response> =>
  request(`/api/dbase`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ id, name, manufacturer, stockLevel }),
  }).then(async (response) => await response.json());

export const remove = async (id: number): Promise<Response> =>
  request(`/api/dbase`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ id }),
  }).then(async (response) => await response.json());
