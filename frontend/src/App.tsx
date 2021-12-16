import React from "react";
import { useEffect } from "react";
import Routing from "@routes";
import { me } from "@store/auth";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import GlobalSpinner from "@components/globalSpinner";

function App() {
  const isLoading = useAppSelector((state) => state.auth.initialLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  if (isLoading) {
    return <GlobalSpinner />;
  }

  return <Routing />;
}

export default App;
