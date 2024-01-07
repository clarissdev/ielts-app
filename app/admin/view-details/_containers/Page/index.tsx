"use client";

import { Table } from "antd";
import useSWR from "swr";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import { httpGet$GetUserDetailsList } from "@/modules/commands/GetUserDetailsList/fetcher";
import { getResourceKey$GetUserDetailsList } from "@/modules/commands/GetUserDetailsList/typing";

export default function Page() {
  const swr = useSWR(
    getResourceKey$GetUserDetailsList(),
    async () => await httpGet$GetUserDetailsList(`/api/v1/user-details/list`)
  );
  const data = swr.data?.filter(
    (item) => item.gradeListening || item.gradeReading || item.gradeWriting
  );
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Table
          dataSource={data?.map((item) => ({
            key: item.userId,
            userId: item.userId,
            name: item.displayName,
            gradeListening: item.gradeListening,
            gradeReading: item.gradeReading,
            gradeWriting: item.gradeWriting
          }))}
          columns={[
            { title: "User ID", dataIndex: "userId", key: "user_id" },
            { title: "Name", dataIndex: "name", key: "name" },
            {
              title: "Grade Listening",
              dataIndex: "gradeListening",
              key: "gradeListening"
            },
            {
              title: "Grade Reading",
              dataIndex: "gradeReading",
              key: "gradeReading"
            },
            {
              title: "Grade Writing",
              dataIndex: "gradeWriting",
              key: "gradeWriting"
            }
          ]}
        />
      </main>
    </div>
  );
}
