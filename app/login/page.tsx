import { useApiAuthentication } from "@/modules/authentication";
import Page from "./_containers/Page";
import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { getDb } from "@/modules/mongodb";
import { cookies } from "next/headers";
import { SWRConfig, unstable_serialize } from "swr";
import { formatFallback } from "../../utils";
import { getResourceKey$LoginStatus } from "@/modules/commands/LoginStatus/fetcher";
import { SWRProvider } from "@/modules/swr/components/SWRProvider";

export default async function Route() {
  const db = await getDb();
  const cookieList = cookies();
  const loginStatus = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value,
  });
  return (
    <SWRProvider
      value={{
        fallback: formatFallback({
          [unstable_serialize(getResourceKey$LoginStatus())]: loginStatus,
        }),
      }}
    >
      <Page />
    </SWRProvider>
  );
}
