"use client";
import Navbar from "@/modules/app-components/Navbar";
import styles from "./index.module.scss";
import useSWR from "swr";
import {
  getResourceKey$GetExamList,
  httpGet$GetExamList,
} from "@/modules/commands/GetExamList/fetcher";
import { Card, Input, Select, Tooltip } from "antd";
import Flex from "@/modules/app-ui/components/Flex";
import { GetExamList$Params } from "@/modules/commands/GetExamList/typing";
import React from "react";
import {
  MdEdit,
  MdOutlineLibraryBooks,
  MdOutlineSettings,
} from "react-icons/md";
import Link from "next/link";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";

export default function Page() {
  const loginStatus = useLoginStatus();
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = React.useState("");
  const params: GetExamList$Params = {
    offset: 0,
    limit: 1000,
    searchQuery,
    year,
  };
  const swr = useSWR(
    getResourceKey$GetExamList(params),
    async () => await httpGet$GetExamList("/api/v1/exam/list", params)
  );
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.section}>
          <div>
            <Flex.Row alignItems="center" gap="16px">
              <div>{"Select Year:"}</div>
              <Select
                value={year}
                options={Array.from(
                  { length: 30 },
                  (_, index) => index + new Date().getFullYear() - 29
                ).map((year) => ({
                  label: year.toString(),
                  value: year,
                }))}
                onChange={(value) => setYear(value)}
              />
            </Flex.Row>
            <Input
              style={{ marginTop: "12px" }}
              value={searchQuery}
              placeholder="Search exam"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Flex.Col paddingTop="20px" gap="12px">
            {swr.data?.exams.map((exam) => (
              <Card
                className={styles.card}
                key={exam.examId}
                title={exam.title}
                actions={[
                  <Tooltip title="Enter Writing Exam">
                    <Link href={`/exam/writing/${exam.writingExamId}`}>
                      <MdEdit />
                    </Link>
                  </Tooltip>,
                  <Tooltip title="Enter Reading Exam">
                    <Link href={`/exam/reading/${exam.readingExamId}`}>
                      <MdOutlineLibraryBooks />
                    </Link>
                  </Tooltip>,
                  ...(loginStatus?.loggedIn &&
                  exam.createdBy === loginStatus.userId
                    ? [
                        <Tooltip title="Edit Exam">
                          <Link href={`/edit/${exam.examId}`}>
                            <MdOutlineSettings />
                          </Link>
                        </Tooltip>,
                      ]
                    : []),
                ]}
              ></Card>
            ))}
          </Flex.Col>
        </section>
      </main>
    </div>
  );
}
