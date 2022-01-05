import { Response, Request, NextFunction } from "express";
const asyncHandler =
  (fn: CallableFunction) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export { asyncHandler };
