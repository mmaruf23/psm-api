import type { WeekType } from "../types";

export const isValidStoreCode = (s: string): boolean => {
  const codeRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{4}$/;
  return codeRegex.test(s);
};

export const isValidProgramCode = (s: string): boolean => {
  // harus 8 digit
  if (!/^\d{8}$/.test(s)) return false;

  const a = Number(s.slice(0, 2)); // 2 digit pertama
  const b = Number(s.slice(2, 4)); // 2 digit selanjutnya
  const c = Number(s.slice(4, 5)); // 1 digit
  const d = Number(s.slice(5)); // 3 digit terakhir

  return (
    a >= 25 &&
    a <= 30 && // 25–20
    b >= 1 &&
    b <= 12 && // 01–12
    c >= 1 &&
    c <= 4 && // 1–4
    d >= 1 &&
    d <= 20 // 001–020
  );
};

export const parseWeekType = (s: string | undefined): WeekType => {
  if (s === "before" || s === "next") return s;
  return "now";
};
