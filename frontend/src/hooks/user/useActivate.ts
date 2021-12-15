import { AxiosError } from "axios";
import { useCallback, useRef } from "react";
import { activate } from "@store/auth";
import { useAppDispatch } from "@store/hooks";
import { useNavigate } from "react-router-dom";
import { useMounted } from "../useMounted";
import { useErrorState } from "../useErrorState";
import { useQuery } from "../useQuery";
import { useDidMount } from "../useDidMount";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store/hooks";
import { RoutingPaths } from "@contants/routing";
import { TimoutTimes } from "../../contants/timeouts";
import { useTranslation } from "react-i18next";

function useActivate() {
  const query = useQuery();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const mounted = useMounted();
  const navigate = useNavigate();
  const timoutRef = useRef<number | null>(null);
  const { error, handleError } = useErrorState();
  const { t } = useTranslation();

  const _activate = useCallback(async () => {
    const token = query.get("token");
    try {
      if (!token) {
        throw new Error(t("Cannot activate account"));
      }
      const result = await dispatch(activate(token));
      unwrapResult(result);

      timoutRef.current = setTimeout(() => {
        navigate(RoutingPaths.dashboard);
      }, TimoutTimes.activate);
    } catch (error) {
      handleError(error as AxiosError | Error);
    }
  }, [dispatch, handleError, navigate, query, t]);

  useDidMount(() => {
    if (mounted.current) {
      _activate();
    }

    return () => {
      if (timoutRef.current) {
        clearTimeout(timoutRef.current);
      }
    };
  });

  return { isSuccess: auth.user, isLoading: auth.loading, error };
}

export { useActivate };
