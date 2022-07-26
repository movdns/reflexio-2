import { Request, Response } from "express";

export type TRequestBody<T> = Request & {
  body: T;
};

export type TResponse<T> = Omit<Response, "json" | "status"> & {
  json(data: T): TResponse<T>;
} & { status(code: number): TResponse<T> };

export type TResponseData = {
  error: boolean;
  data?: TDaySnapshot | TDaySnapshot[] | null;
  message?: string;
};

export type TDaySnapshot = {
  id: string;
  uid?: string;
  date?: string;
  score?: string;
  description?: {
    blocks: [
      {
        type: string;
        id: number;
        level: number;
        text: string;
      }
    ];
    time: number;
  };
  icons?: string[];
} | null;
