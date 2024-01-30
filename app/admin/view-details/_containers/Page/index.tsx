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
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Table
          dataSource={swr.data?.map((item) => ({
            key: item.userId,
            name: item.displayName,
            phoneNumber: item.phoneNumber || "",
            school: item.school || "",
            gradeListening: item.gradeListening || "",
            gradeReading: item.gradeReading || "",
            gradeWriting: item.gradeWriting || "",
            gradeSpeaking: item.gradeSpeaking || ""
          }))}
          columns={[
            { title: "Name", dataIndex: "name", key: "name" },
            {
              title: "Phone Number",
              dataIndex: "phoneNumber",
              key: "phoneNumber"
            },
            {
              title: "School",
              dataIndex: "school",
              key: "school"
            },
            {
              title: "Listening",
              dataIndex: "gradeListening",
              key: "gradeListening"
            },
            {
              title: "Reading",
              dataIndex: "gradeReading",
              key: "gradeReading"
            },
            {
              title: "Writing",
              dataIndex: "gradeWriting",
              key: "gradeWriting"
            },
            {
              title: "Speaking",
              dataIndex: "gradeSpeaking",
              key: "gradeSpeaking"
            }
          ]}
        />
      </main>
    </div>
  );
}
