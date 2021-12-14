import React from "react";
import { useEffect } from "react";
import { AppSpinner } from "./components/spinner";
import Routing from "./routes";
import { me } from "./store/auth";
import { useAppSelector, useAppDispatch } from "./store/hooks";

function App() {
  const isLoading = useAppSelector((state) => state.auth.initialLoading);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  if (isLoading) {
    return <AppSpinner />;
  }

  return (
    <>
      {JSON.stringify(user)}
      <Routing />
    </>
  );
}

export default App;
