import { AxiosError } from "axios";
import { useCallback, useRef, useState } from "react";
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
import { TimeoutTimes } from "../../contants/timeouts";

function useActivate() {
  const query = useQuery();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const mounted = useMounted();
  const navigate = useNavigate();
  const timoutRef = useRef<number | null>(null);
  const { error, handleError } = useErrorState();
  const [isLoading, setLoading] = useState(true);

  const _activate = useCallback(
    async (token: string) => {
      try {
        const result = await dispatch(activate(token));
        unwrapResult(result);
      } catch (error) {
        handleError(error as AxiosError | Error);
      } finally {
        setLoading(false);
        timoutRef.current = setTimeout(() => {
          navigate(RoutingPaths.dashboard);
        }, TimeoutTimes.activate);
      }
    },
    [dispatch, handleError, navigate]
  );

  useDidMount(() => {
    if (mounted.current) {
      const token = query.get("token");
      if (!token || !!auth.user) {
        setTimeout(() => navigate(RoutingPaths.dashboard), 0);
        return;
      }
      _activate(token);
    }

    return () => {
      if (timoutRef.current) {
        clearTimeout(timoutRef.current);
      }
    };
  });

  return { isSuccess: !!auth.user && !error, isLoading, error };
}

export { useActivate };
