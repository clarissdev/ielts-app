import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_serialize } from "swr";

import { formatFallback, intentionallyIgnoreError } from "../../../../utils";

import Page from "./_containers/Page";

import { handler$GetSubmissionWriting } from "@/modules/commands/GetSubmissionWriting/handler";
import { handler$GetUser } from "@/modules/commands/GetUser/hander";
import { handler$GetWritingExam } from "@/modules/commands/GetWritingExam/handler";
import { getResourceKey$LoginStatus } from "@/modules/commands/LoginStatus/fetcher";
import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { getDb } from "@/modules/mongodb";
import { SWRProvider } from "@/modules/swr/components/SWRProvider";

export const metadata: Metadata = {
  title: "Submission Writing"
};

type Props = {
  params: { submissionId: string };
};

export default async function Route({ params }: Props) {
  const db = await getDb();
  const cookieList = cookies();
  const loginStatus = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value
  });

  const submission = await handler$GetSubmissionWriting(db, {
    submissionId: params.submissionId
  }).catch(intentionallyIgnoreError);
  if (!submission) {
    notFound();
  }

  const exam = await handler$GetWritingExam(db, {
    examId: submission.examId
  }).catch(intentionallyIgnoreError);
  if (!exam) {
    notFound();
  }

  const user = await handler$GetUser(db, {
    userId: submission.createdBy
  }).catch(intentionallyIgnoreError);
  if (!user) {
    notFound();
  }

  return (
    <SWRProvider
      value={{
        fallback: formatFallback({
          [unstable_serialize(getResourceKey$LoginStatus())]: loginStatus
        })
      }}
    >
      <Page submission={submission} exam={exam} user={user} />
    </SWRProvider>
  );
}
