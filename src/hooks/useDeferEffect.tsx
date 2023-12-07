import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useDeferEffect = (effect: EffectCallback, deps?: DependencyList | undefined) => {
  const isDefered = useRef(false);
  useEffect(() => {
    if (!isDefered.current) {
      isDefered.current = true;
      return;
    }

    return effect();
  }, deps);
};

export default useDeferEffect;
