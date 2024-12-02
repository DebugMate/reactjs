import React, { createContext, useContext } from 'react';
import { useDebugmateState } from '../contexts/Debugmate';

export const DebugmateContext = createContext(null);

export const useDebugmateContext = () => useContext(DebugmateContext);

export const DebugmateProvider = ({ children, domain, token, enabled }) => {
  const debugmate = useDebugmateState({ domain, token, enabled });

  return (
    <DebugmateContext.Provider value={debugmate}>
      {children}
    </DebugmateContext.Provider>
  );
};