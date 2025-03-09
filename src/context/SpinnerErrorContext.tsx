"use client";
import { SpinnerContextProps } from "@/types";
import React, { createContext, ReactNode, useState } from "react";

const defaultContextValue: SpinnerContextProps = {
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
};

export const SpinnerContext =
  createContext<SpinnerContextProps>(defaultContextValue);

const SpinnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <SpinnerContext.Provider value={{ loading, setLoading, error, setError }}>
      {children}
    </SpinnerContext.Provider>
  );
};

export default SpinnerProvider;
