import type { ContentfulStatusCode } from "hono/utils/http-status";
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
    console.log("dummy");
    fetchedData = dummyRaw;
  } else {
    fetchedData = await fetchProgramData(week_type, kode_periode);
  }

  if (!fetchedData.length) {
    const noDataResponse: ApiResponse = { success: false, code: 404, message: "no data provided from the server" };
    await kv.put(kode_periode, JSON.stringify(noDataResponse), {
      expirationTtl: 43200,
    });
    return noDataResponse;
  }

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

      if (res.status === 200) {
        result.push(await res.text());
      } else {
        // worker happy
        res.body?.cancel();
      }
    } catch (error) {
      continue;
    }
  }

  return result;
}

async function getPSMData(kode_toko: string, kode_program: string, week_type: WeekType): Promise<ApiResponse> {
  if (!isValidStoreCode(kode_toko)) return { success: false, code: 400, message: "invalid kd_toko format" };
  if (!isValidProgramCode(kode_program)) return { success: false, code: 400, message: "invalid kode_program format" };

  const url = `https://intranet.sat.co.id/pdmstore/public/file/cashier/${week_type}/${kode_program}_${kode_toko.toUpperCase()}.csv`;

  let response: string;
  try {
    const res = dev_mode ? new Response(dummyAcv, { status: 200 }) : await fetch(url);

    if (res.status !== 200)
      return { success: false, code: res.status as ContentfulStatusCode, message: res.statusText };

    response = await res.text();
  } catch (error) {
    console.error(error);
    return { success: false, code: 500, message: "error getting psm data" };
  }

  const result = parseArchiveData(response);

  return { success: true, code: 200, data: result };
}

export default { getProgramData, getPSMData };
