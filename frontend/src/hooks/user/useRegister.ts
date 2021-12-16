import { registerSuccessToast } from "./../../toasts/index";
import { useToast } from "@chakra-ui/react";
import { RegisterBody } from "@api/types";
import { useErrorState } from "@hooks/useErrorState";
import { handleError } from "@api/error";
import userApi from "@api/user";
import { registerErrorToast } from "../../toasts/index";
import { useState } from "react";

interface UseLogin {
  onError?: () => void;
  onSuccess?: () => void;
}

function useRegister({ onSuccess, onError }: UseLogin) {
  const { error, handleError: handleRegisterError, reset } = useErrorState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleRegister = async (body: RegisterBody) => {
    try {
      reset();
      setLoading(true);
      await userApi.register(body);
      onSuccess?.();
      toast(registerSuccessToast());
    } catch (err) {
      handleRegisterError(err);
      onError?.();
      toast(registerErrorToast(handleError(err).message));
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
}

export { useRegister };
