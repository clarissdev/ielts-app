import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { unstable_serialize } from "swr";

import Page from "./_containers/Page";

import { handler$GetSatExam } from "@/modules/commands/GetSatExam/handler";
import { handler$GetSubmissionSat } from "@/modules/commands/GetSubmissionSat/handler";
import { getResourceKey$LoginStatus } from "@/modules/commands/LoginStatus/fetcher";
import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { getDb } from "@/modules/mongodb";
import { SWRProvider } from "@/modules/swr/components/SWRProvider";
import { intentionallyIgnoreError, formatFallback } from "../../../../utils";

export const metadata: Metadata = {
  title: "SAT"
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

  console.log(loginStatus);

  const exam = await handler$GetSatExam(db, params).catch(
    intentionallyIgnoreError
  );
  if (!exam) notFound();

  const submission = await handler$GetSubmissionSat(db, {
    createdBy: loginStatus.userId,
    examId: params.examId
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
