import { AxiosError } from "axios";
import { useState } from "react";

function useErrorState() {
  const [error, setError] = useState<AxiosError | Error | null>(null);

  const reset = () => {
    if (error) {
      setError(error);
    }
  };

  const handleError = (err: AxiosError | Error | unknown) => {
    if (error) {
      console.warn("Error is being overwritten");
    }

    setError(<AxiosError | Error>err);
  };

  return { error, handleError, reset };
}

export { useErrorState };
