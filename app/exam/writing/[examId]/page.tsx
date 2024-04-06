import { Metadata } from "next";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { unstable_serialize } from "swr";

import { formatFallback, intentionallyIgnoreError } from "../../../../utils";

import Page from "./_containers/Page";

import { handler$GetSubmissionWriting } from "@/modules/commands/GetSubmissionWriting/handler";
import { handler$GetWritingExam } from "@/modules/commands/GetWritingExam/handler";
import { getResourceKey$LoginStatus } from "@/modules/commands/LoginStatus/fetcher";
import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { getDb } from "@/modules/mongodb";
import { SWRProvider } from "@/modules/swr/components/SWRProvider";

export const metadata: Metadata = {
  title: "Writing"
};

type PageProps = {
  params: { examId: string };
};

export default async function Route({ params }: PageProps) {
  const db = await getDb();
  const cookieList = cookies();
  const loginStatus = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value
  });
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "/";

  if (!loginStatus.loggedIn) {
    redirect(`/login?${new URLSearchParams({ redirectUrl: pathname })}`);
  }
  if (
    !loginStatus.displayName ||
    !loginStatus.school ||
    !loginStatus.phoneNumber
  ) {
    notFound();
  }

  const exam = await handler$GetWritingExam(db, {
    examId: params.examId
  }).catch(intentionallyIgnoreError);
  if (!exam) notFound();

  const submission = await handler$GetSubmissionWriting(db, {
    examId: params.examId,
    createdBy: loginStatus.userId
  }).catch(intentionallyIgnoreError);

  if (submission) notFound();

  return (
    <SWRProvider
      value={{
        fallback: formatFallback({
          [unstable_serialize(getResourceKey$LoginStatus())]: loginStatus
        })
      }}
    >
      <Page initialExam={exam} />
    </SWRProvider>
  );
}
