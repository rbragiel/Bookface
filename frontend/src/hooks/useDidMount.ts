import { EffectCallback, useEffect } from "react";
function useDidMount(cb: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, []);
}

export { useDidMount };
