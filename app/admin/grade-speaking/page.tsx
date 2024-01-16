import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { unstable_serialize } from "swr";

import { formatFallback, intentionallyIgnoreError } from "../../../utils";

import Page from "./_containers/Page";

import { handler$GetSubmissionSpeakingList } from "@/modules/commands/GetSubmissionSpeakingList/handler";
import { getResourseKey$GetSubmissionSpeakingList } from "@/modules/commands/GetSubmissionSpeakingList/typing";
import { getResourceKey$LoginStatus } from "@/modules/commands/LoginStatus/fetcher";
import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { getDb } from "@/modules/mongodb";
import { SWRProvider } from "@/modules/swr/components/SWRProvider";

export const metadata: Metadata = {
  title: "Grade Speaking"
};

export default async function Route() {
  const db = await getDb();
  const cookieList = cookies();
  const loginStatus = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value
  });
  if (!loginStatus.loggedIn || !loginStatus.isAgent) notFound();

  const ungradedExams = await handler$GetSubmissionSpeakingList(db, {
    graded: false
  }).catch(intentionallyIgnoreError);

  return (
    <SWRProvider
      value={{
        fallback: formatFallback({
          [unstable_serialize(getResourceKey$LoginStatus())]: loginStatus,
          [unstable_serialize(
            getResourseKey$GetSubmissionSpeakingList({ graded: false })
          )]: ungradedExams
        })
      }}
    >
      <Page />
    </SWRProvider>
  );
}
