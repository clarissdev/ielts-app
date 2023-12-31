import useSWR from "swr";

import {
  getResourceKey$LoginStatus,
  httpGet$LoginStatus
} from "../commands/LoginStatus/fetcher";
import { LoginStatus$Result } from "../commands/LoginStatus/typing";

type LoginStatus = LoginStatus$Result & {
  confirmed: boolean;
  error?: unknown;
};

export function useLoginStatus(): LoginStatus | undefined {
  const { data, error } = useSWR(
    getResourceKey$LoginStatus(),
    async () => await httpGet$LoginStatus("/api/v1/auth/login-status")
  );
  if (error) {
    return { confirmed: true, loggedIn: false, error };
  }
  if (!data) {
    // TODO: use the last saved info
    return { confirmed: false, loggedIn: false };
  }
  return { confirmed: true, ...data };
}
