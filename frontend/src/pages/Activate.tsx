import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMounted } from "../hooks/useMounted";

import { useQuery } from "../hooks/useQuery";
import { activate } from "../store/auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Activate = () => {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const mounted = useMounted();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const activateUser = async () => {
      if (mounted.current) {
        const token = query.get("token");
        if (token) {
          await dispatch(activate(token));
          navigate("/");
        } else {
          navigate("/");
        }
      }
    };
    activateUser();
  }, []);

  return <div>{JSON.stringify(user)}</div>;
};

export { Activate };
