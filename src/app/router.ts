import psmHandler from "../handlers/psm.handler";
import { factory } from "./factory";

export const psm = factory
  .createApp()
  .get("/", ...psmHandler.getPeriode)
  .get("/:kode_toko/:kode_program", ...psmHandler.getArchive);

export const env = factory.createApp().get("/", async (c) => {
  const { DEV } = c.env;
  return c.text(DEV);
});
