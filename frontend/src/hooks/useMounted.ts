import { useCallback, useEffect, useRef } from "react";

function useMounted() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const isMounted = useCallback(() => mounted.current, []);

  return isMounted;
}

export { useMounted };
