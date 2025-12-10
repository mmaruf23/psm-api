import { factory } from "../app/factory";
import { parseWeekType } from "../helpers/validator";
import psmService from "../services/psm.service";

const getPeriode = factory.createHandlers(async (c) => {
  const week_type = parseWeekType(c.req.query("periode"));

  const result = await psmService.getProgramData(c.env.PSM, week_type);
  return c.json(result, result.code);
});

const getArchive = factory.createHandlers(async (c) => {
  const week_type = parseWeekType(c.req.query("periode"));
  const kode_toko = c.req.param("kode_toko")!;
  const kode_program = c.req.param("kode_program")!;
  const result = await psmService.getPSMData(kode_toko, kode_program, week_type);

  return c.json(result, result.code);
});

export default { getPeriode, getArchive };
