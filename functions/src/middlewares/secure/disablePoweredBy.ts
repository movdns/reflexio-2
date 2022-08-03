import { Request, Response, NextFunction } from "express";

/**
 * Modify page headers by removing "X-Powered-By"
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
function disablePoweredBy(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.removeHeader("X-Powered-By");
  next();
}

export default disablePoweredBy;
