import { useEffect, useMemo } from 'react';
import Debugmate from '../debugmate';

export const useDebugmateState = () => {
  const debugmate = useMemo(() => new Debugmate({
          domain: process.env.REACT_APP_DEBUGMATE_DOMAIN || process.env.NEXT_PUBLIC_DEBUGMATE_DOMAIN,
          token: process.env.REACT_APP_DEBUGMATE_TOKEN || process.env.NEXT_PUBLIC_DEBUGMATE_TOKEN,
          enabled: process.env.REACT_APP_DEBUGMATE_ENABLED || process.env.NEXT_PUBLIC_DEBUGMATE_ENABLED,
  }), []);

  useEffect(() => {
    debugmate.setupGlobalErrorHandling();

    return () => {
      debugmate.cleanupGlobalErrorHandling();
    };
  }, [debugmate]);

  return { debugmate };
}


