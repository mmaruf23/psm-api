import { isValidProgramCode, isValidStoreCode } from "./validator";

const result = isValidStoreCode("JB57");
console.assert(result, "ERROR FORMAT SALAH");

console.assert(isValidProgramCode("25124001"), "LOGIC ERROR");
console.assert(!isValidProgramCode("24124001"), "FORMAT SALAH");
console.assert(!isValidProgramCode("25124000"), "FORMAT SALAH");
console.assert(!isValidProgramCode("251240011"), "FORMAT SALAH");

console.log("TEST DONE");
