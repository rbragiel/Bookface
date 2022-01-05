import axios from "axios";
import { Request, NextFunction, Response } from "express";
import { Constants, HttpErrorStatusCode } from "../common/constants";
import { HttpError } from "../common/errors";
import { logger } from "../common/logger";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  logger.info("Starting auth");
  const authorization = req.headers.authorization;
  if (!authorization) {
    logger.info("Token does not exists");
    return next(
      new HttpError("User unauthorized.", HttpErrorStatusCode.UNAUTHORIZED)
    );
  }

  try {
    const { data } = await axios.get(Constants.AUTH_SERVICE_URL, {
      headers: { Authorization: authorization },
    });

    req.user = data;

    return next();
  } catch (error) {
    return next(
      new HttpError("User unauthorized.", HttpErrorStatusCode.UNAUTHORIZED)
    );
  }
};

export { auth };
