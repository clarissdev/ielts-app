"use client";

import Link from "next/link";
import useSWR from "swr";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import { httpGet$GetSubmissionWritingList } from "@/modules/commands/GetSubmissionWritingList/fetcher";
import { getResourseKey$GetSubmissionWritingList } from "@/modules/commands/GetSubmissionWritingList/typing";

export default function Page() {
  const params = { graded: false };
  const swr = useSWR(
    getResourseKey$GetSubmissionWritingList(params),
    async () =>
      await httpGet$GetSubmissionWritingList(
        `/api/v1/exam/writing/list`,
        params
      )
  );
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <h1>Ungraded exam</h1>
        <ul>
          {swr.data?.map((item) => (
            <li key={item.submissionId}>
              <Link href={`/submission/writing/${item.submissionId}`}>
                {item.submissionId}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
