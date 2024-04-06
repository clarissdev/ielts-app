import { Metadata } from "next";
import { cookies } from "next/headers";
import { unstable_serialize } from "swr";

import { formatFallback, intentionallyIgnoreError } from "../../utils";

import Page from "./_containers/Page";
import { getResourceKey$LoginStatus } from "@/modules/commands/LoginStatus/fetcher";
import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { getDb } from "@/modules/mongodb";
import { SWRProvider } from "@/modules/swr/components/SWRProvider";

export const metadata: Metadata = {
  title: "TEC - IELTS Test"
};

export default async function Route() {
  const db = await getDb();
  const cookieList = cookies();
  const loginStatus = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value
  });

  return (
    <SWRProvider
      value={{
        fallback: formatFallback({
          [unstable_serialize(getResourceKey$LoginStatus())]: loginStatus
        })
      }}
    >
      <Page />
    </SWRProvider>
  );
}
