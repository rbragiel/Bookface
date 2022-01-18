import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useConditionalRedirect(expr: boolean, redirect = "/dashboard") {
  const navigate = useNavigate();

  useEffect(() => {
    if (expr) {
      navigate(redirect);
    }
  }, [expr, redirect, navigate]);
}

export { useConditionalRedirect };
