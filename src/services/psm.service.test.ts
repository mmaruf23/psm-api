import { getPeriod } from "../helpers/time";
import type { WeekType } from "../types";
import { fetchProgramData } from "./psm.service";

(async () => {
  const kode_toko = "J007";
  const week_type: WeekType = "now";
  const kode_periode = getPeriod(week_type);

  const result = await fetchProgramData(week_type, kode_periode);

  console.log(result);
})();
