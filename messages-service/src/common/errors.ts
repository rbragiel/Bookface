import { HttpErrorStatusCode } from "./constants";

class HttpError extends Error {
  constructor(message: string, public status: HttpErrorStatusCode) {
    super(message);
  }
}

const isHttpError = (error: Error | unknown) => {
  return error instanceof HttpError;
};

export { HttpError, isHttpError };
