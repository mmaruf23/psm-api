import { factory } from "../app/factory";
import { parseWeekType } from "../helpers/validator";
import psmService from "../services/psm.service";

const getPeriodeNow = factory.createHandlers(async (c) => {
  const kode_toko = c.req.param("kode_toko")!;
  const week_type = parseWeekType(c.req.query("periode"));

  const result = await psmService.getPeriodeData(c.env.KV, kode_toko, week_type);
  return c.json(result, result.code);
});

export default { getPeriodeNow };
