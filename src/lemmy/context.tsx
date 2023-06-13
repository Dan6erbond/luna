import { LemmyHttp } from "lemmy-js-client";
import React from "react";

export const LemmyClientContext = React.createContext<LemmyHttp | null>(null);

interface LemmyProviderProps {
  client: LemmyHttp;
  children?: React.ReactNode;
}

export const LemmyProvider = ({ client, children }: LemmyProviderProps) => {
  return (
    <LemmyClientContext.Provider value={client}>
      {children}
    </LemmyClientContext.Provider>
  );
};
