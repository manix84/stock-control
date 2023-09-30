import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { NextApiRequest, NextApiResponse } from "next/types";
import { StockItem, StockItems } from "../../@types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../../public/dbase/", "stock.json");

const adapter = new JSONFile<StockItems>(file);
const db = new Low<StockItems>(adapter, []);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await db.read();
  let dbase = db.data;
  const { id, name, manufacturer, stockLevel }: StockItem & { id?: number } =
    req.body;

  console.log({ id, name, manufacturer, stockLevel, body: req.body });

  switch (req.method) {
    case "PUT": // Put Data
      if (!name || !manufacturer || isNaN(stockLevel) || stockLevel < 0) {
        return res
          .status(400)
          .json({ success: false, error: "Missing data", error_id: 2 });
      }
      if (id) {
        dbase[id] = { name, manufacturer, stockLevel };
      } else {
        dbase.push({ name, manufacturer, stockLevel });
      }
      await db.write();
      return res.status(200).json({ success: true });
    case "GET": // Get Data
      return res.status(200).json(dbase);
    case "DELETE":
      if (!id) {
        res
          .status(400)
          .json({ success: false, error: "Missing data", error_id: 3 });
      }
      dbase = dbase.splice(id as number, 1);
      await db.write();
      return res.status(200).json(dbase);
    default:
  }
};
