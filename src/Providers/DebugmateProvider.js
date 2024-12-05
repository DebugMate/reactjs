"use client"

import React, { createContext, useContext } from 'react';
import { useDebugmateState } from '../contexts/Debugmate';
import ErrorBoundary from '../component/ErrorBoundary';

export const DebugmateContext = createContext(null);

export const useDebugmateContext = () => useContext(DebugmateContext);

export const DebugmateProvider = ({ children, domain, token, enabled }) => {
  const debugmate = useDebugmateState({ domain, token, enabled });

  return (
    <DebugmateContext.Provider value={debugmate}>
      <ErrorBoundary domain={domain} token={token} enabled={enabled}>
        {children}
      </ErrorBoundary>
    </DebugmateContext.Provider>
  );
};
