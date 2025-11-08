import psmHandler from "../handlers/psm.handler";
import { factory } from "./factory";

export const testRoute = factory.createApp().get("/", async (c) => {
  await c.env.DB.exec("CREATE TABLE test (id INT PRIMARY KEY, name TEXT DEFAULT NULL);");
  return c.text("OK");
});

export const psm = factory.createApp().get("/:kode_toko", ...psmHandler.getPeriodeNow);
