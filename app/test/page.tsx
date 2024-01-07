import { Metadata } from "next";
import { cookies } from "next/headers";
import { unstable_serialize } from "swr";

import { formatFallback, intentionallyIgnoreError } from "../../utils";

import Page from "./_containers/Page";

import { handler$GetSubmissionListening } from "@/modules/commands/GetSubmissionListening/handler";
import { handler$GetSubmissionReading } from "@/modules/commands/GetSubmissionReading/handler";
import { handler$GetSubmissionWriting } from "@/modules/commands/GetSubmissionWriting/handler";
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

  const submissionReading = loginStatus.loggedIn
    ? await handler$GetSubmissionReading(db, {
        createdBy: loginStatus.userId
      }).catch(intentionallyIgnoreError)
    : undefined;

  const submissionListening = loginStatus.loggedIn
    ? await handler$GetSubmissionListening(db, {
        createdBy: loginStatus.userId
      }).catch(intentionallyIgnoreError)
    : undefined;

  const submissionWriting = loginStatus.loggedIn
    ? await handler$GetSubmissionWriting(db, {
        createdBy: loginStatus.userId
      }).catch(intentionallyIgnoreError)
    : undefined;

  return (
    <SWRProvider
      value={{
        fallback: formatFallback({
          [unstable_serialize(getResourceKey$LoginStatus())]: loginStatus
        })
      }}
    >
      <Page
        submissionReading={submissionReading}
        submissionListening={submissionListening}
        submissionWriting={submissionWriting}
      />
    </SWRProvider>
  );
}
