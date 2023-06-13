import { useContext } from "react";
import { LemmyClientContext } from "./context";

export const useLemmy = () => {
  const client = useContext(LemmyClientContext);

  if (client === null) {
    throw new Error("Lemmy client not available, LemmyProvider must be used");
  }

  return client;
};
