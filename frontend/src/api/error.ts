import axios, { AxiosError } from "axios";

const handleError = (err: unknown) => {
  const catchedError = <AxiosError | Error>err;
  return axios.isAxiosError(catchedError)
    ? catchedError.response?.data
    : catchedError;
};

export { handleError };
