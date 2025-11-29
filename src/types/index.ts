import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";

type SuccessResponse<T> = {
  success: true;
  code: ContentfulStatusCode;
  data?: T;
};

type ErrorResponse = {
  success: false;
  code: ContentfulStatusCode;
  message: string;
};

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

export type PluData = {
  kd_store: string;
  nama_store: string;
  cabang: string;
  personel: string;
  kode_program: string;
  nama_program: string;
  plu: string;
  descp: string;
  target: string;
};

export type ProgramData = {
  kode_program: string;
  nama_program: string;
  items: {
    plu: string;
    descp: string;
  }[];
};

export type RawArchiveData = {
  kd_cabang: string;
  nik: string;
  nama: string;
  kd_jabatan: string;
  jabatan: string;
  asq: string;
  target_min: string;
  qty_act: string;
  pct: string;
  pos_umum: string;
  pos_branch: string;
  pos_region: string;
  pos_nas: string;
  status: string;
  kd_store: string;
  status_umum: string;
  status_branch: string;
  status_regional: string;
  status_nas: string;
};

export type ArchiveData = {
  kd_cabang: string;
  asq: string;
  target_min: string;
  status: string;
  kd_store: string;
  cashier: {
    nik: string;
    nama: string;
    jabatan: string;
    qty_act: string;
    pct: string;
    pos_umum: string;
    pos_branch: string;
    pos_region: string;
    pos_nas: string;
  }[];
};

export type WeekType = "now" | "before" | "next";
