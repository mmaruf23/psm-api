import { dummyAcv, dummyRaw } from "../sample/dummy";
import { parseArchiveData, parsePeriodeData } from "./mapper";

// const periode_data = parsePeriodeData(dummyRaw);
// console.log(JSON.stringify(periode_data, null, 2));

parseArchiveData(dummyAcv);
