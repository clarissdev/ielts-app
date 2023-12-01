"use client";

import * as React from "react";

import { Api } from "..";

export const ApiContext = React.createContext<Api>({
  triggerGoogleAuthentication: () => {
    throw Error("context not injected");
  },
});
