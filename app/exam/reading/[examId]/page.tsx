import Page from "./_containers/Page";
import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { getDb } from "@/modules/mongodb";
import { cookies } from "next/headers";
import { unstable_serialize } from "swr";
import { formatFallback, intentionallyIgnoreError } from "../../../../utils";
import { getResourceKey$LoginStatus } from "@/modules/commands/LoginStatus/fetcher";
import { SWRProvider } from "@/modules/swr/components/SWRProvider";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { handler$GetReadingExam } from "@/modules/commands/GetReadingExam/handler";

type PageProps = {
  params: { examId: string };
  searchParams: { returnAnswer: string | null | undefined };
};

export default async function Route({ params, searchParams }: PageProps) {
  const db = await getDb();
  const cookieList = cookies();
  const loginStatus = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value,
  });
  const headersList = headers();
  // const pathname = headersList.get("x-pathname") || "/";

  // if (!loginStatus.loggedIn) {
  //   redirect(`/login?${new URLSearchParams({ redirectUrl: pathname })}`);
  // }

  const exam = await handler$GetReadingExam(db, {
    params,
  }).catch(intentionallyIgnoreError);
  if (!exam) notFound();
  return (
    <SWRProvider
      value={{
        fallback: formatFallback({
          [unstable_serialize(getResourceKey$LoginStatus())]: loginStatus,
        }),
      }}
    >
      <Page initialExam={exam} />
    </SWRProvider>
  );
}
