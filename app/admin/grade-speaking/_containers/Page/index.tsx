"use client";

import Link from "next/link";
import useSWR from "swr";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import { httpGet$GetSubmissionSpeakingList } from "@/modules/commands/GetSubmissionSpeakingList/fetcher";
import { getResourseKey$GetSubmissionSpeakingList } from "@/modules/commands/GetSubmissionSpeakingList/typing";

export default function Page() {
  const params = { graded: false };
  const swr = useSWR(
    getResourseKey$GetSubmissionSpeakingList(params),
    async () =>
      await httpGet$GetSubmissionSpeakingList(
        `/api/v1/exam/speaking/list`,
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
              <Link href={`/submission/speaking/${item.submissionId}`}>
                {item.submissionId}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
