import React, { useEffect, useMemo } from 'react';
import Debugmate from '../debugmate';

export const useDebugmateState = ({ domain, token, enabled, user, environment }) => {
  const debugmate = useMemo(() => new Debugmate({
    domain,
    token,
    enabled,
  }), [domain, token, enabled]);

  useEffect(() => {
    debugmate.setupGlobalErrorHandling();

    if(user){
      debugmate.setUser(user);
    }

    if(environment){
      debugmate.setEnvironment(environment);
    }

    return () => {
      debugmate.cleanupGlobalErrorHandling();
    };
  }, [debugmate]);

  return debugmate;
};