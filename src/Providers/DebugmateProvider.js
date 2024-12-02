import React, { createContext, useContext } from 'react';
import { useDebugmateState } from '../contexts/Debugmate';

export const DebugmateContext = createContext({});

export const useDebugmateContext = () => useContext(DebugmateContext);

export const DebugmateProvider = ({ children }) => {
  const DebugmateState = useDebugmateState();

  return (
    <DebugmateContext.Provider value={DebugmateState}>
      {children}
    </DebugmateContext.Provider>
  );
}
