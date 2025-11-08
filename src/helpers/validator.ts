import type { WeekType } from "../types";

export const isValidStoreCode = (s: string): boolean => {
  const codeRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{4}$/;
  return codeRegex.test(s);
};

export const parseWeekType = (s: string | undefined): WeekType => {
  if (s === "before" || s === "next") return s;
  return "now";
};
