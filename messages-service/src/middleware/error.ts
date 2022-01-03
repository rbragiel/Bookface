/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction, Request } from "express";
import { HttpErrorStatusCode } from "../common/constants";
import { HttpError, isHttpError } from "../common/errors";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(
    `Cannot ${req.method}, not found`,
    HttpErrorStatusCode.NOT_FOUND
  );
  next(error);
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = isHttpError(error)
    ? (error as HttpError).status
    : HttpErrorStatusCode.INTERNAL_SERVER_ERROR;

  return res.status(status).json({ message: error.message });
};
