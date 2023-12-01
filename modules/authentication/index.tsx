import * as React from "react";

import { ApiContext } from "./contexts/ApiContext";

export type Api = {
  triggerGoogleAuthentication?: () => void;
};

export function useApiAuthentication() {
  return React.useContext(ApiContext);
}
