import { dev_mode } from "../app/factory";
import { parsePeriodeData, parseCSVtoObject, parseArchiveData } from "../helpers/mapper";
import { getPeriod } from "../helpers/time";
import { isValidProgramCode, isValidStoreCode } from "../helpers/validator";
import { dummyAcv, dummyRaw } from "../sample/dummy";
import type { ApiResponse, RawArchiveData, ProgramData, WeekType, ArchiveData } from "../types";

async function getProgramData(kv: KVNamespace, week_type: WeekType): Promise<ApiResponse> {
  const kode_periode = getPeriod(week_type);
  let listProgramData: ProgramData[] | null = await kv.get(kode_periode, "json");
  if (listProgramData) {
    console.log("pake dari kv");
    return { success: true, code: 200, data: listProgramData };
  }

  let fetchedData: string[];
  if (dev_mode) {
    console.log("pake dummyRaw");
    fetchedData = dummyRaw;
  } else {
    fetchedData = await fetchProgramData(week_type, kode_periode);
  }

  if (!fetchedData.length) return { success: false, code: 404, message: "no data provided from the server" };

  listProgramData = parsePeriodeData(fetchedData);
  await kv.put(kode_periode, JSON.stringify(listProgramData));

  return { success: true, code: 200, data: listProgramData };
}

export async function fetchProgramData(week_type: WeekType, kode_periode: string) {
  const result: string[] = [];

  for (let i = 1; i <= 10; i++) {
    const url = `https://intranet.sat.co.id/pdmstore/public/file/plu/${week_type}/${kode_periode}${i
      .toString()
      .padStart(3, "0")}_J001.csv`;
    try {
      const res = await fetch(url);

      if (res.status === 200) result.push(await res.text());
    } catch (error) {
      continue;
    }
  }

  return result;
}

async function getPSMData(kode_toko: string, kode_program: string, week_type: WeekType): Promise<ApiResponse> {
  if (!isValidStoreCode(kode_toko)) return { success: false, code: 400, message: "invalid kd_toko format" };
  if (!isValidProgramCode(kode_program)) return { success: false, code: 400, message: "invalid kode_program format" };

  const url = `https://intranet.sat.co.id/psmstore/public/file/cashier/${week_type}/${kode_program}_${kode_toko.toUpperCase()}.csv`;

  try {
    const response = dev_mode ? dummyAcv : await (await fetch(url)).text();

    console.log(response === dummyAcv, " adalah dummy");

    const result = parseArchiveData(response) as ArchiveData;

    return { success: true, code: 200, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, code: 500, message: "error getting psm data" };
  }
}

export default { getProgramData, getPSMData };
