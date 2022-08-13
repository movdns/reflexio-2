import { Request, Response } from "express";

export type TRequestBody<T> = Request & {
  body: T;
};

export type TResponse<T> = Omit<Response, "json" | "status"> & {
  json(data: T): TResponse<T>;
} & { status(code: number): TResponse<T> };

export type TResponseData<T> = {
  error: boolean;
  data?: T;
  message?: string;
};

// Extend "request" with user object (for auth permissions check)
export {};
declare global {
  namespace Express {
    export interface Request {
      user?: {
        name: string;
        uid: string;
      };
    }
  }
}
