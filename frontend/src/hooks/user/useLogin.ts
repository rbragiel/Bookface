import { useToast } from "@chakra-ui/react";
import { login } from "@store/auth";
import { LoginBody } from "@api/types";
import { useErrorState } from "@hooks/useErrorState";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { loginSuccessToast, loginErrorToast } from "@toasts";
import { handleError } from "@api/error";
import { unwrapResult } from "@reduxjs/toolkit";

interface UseLogin {
  onError?: () => void;
  onSuccess?: () => void;
}

function useLogin({ onSuccess, onError }: UseLogin) {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();
  const { error, handleError: handleLoginError, reset } = useErrorState();
  const toast = useToast();

  const handleLogin = async (body: LoginBody) => {
    try {
      reset();
      const response = await dispatch(login(body));
      unwrapResult(response);
      onSuccess?.();
      toast(loginSuccessToast());
    } catch (err) {
      handleLoginError(err);
      onError?.();
      toast(loginErrorToast(handleError(err).message));
    }
  };

  return { handleLogin, loading, error };
}

export { useLogin };
