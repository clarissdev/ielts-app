"use client";

import { Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import useNotification from "antd/es/notification/useNotification";
import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import Editor from "@/modules/app-ui/components/Editor";
import Flex from "@/modules/app-ui/components/Flex";
import { User, WritingExam } from "@/modules/business-types";
import { GetSubmissionWriting$Result } from "@/modules/commands/GetSubmissionWriting/typing";
import { httpPost$SubmitWritingGrade } from "@/modules/commands/SubmitWritingGrade/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { DisplayableError } from "@/modules/error";

type Props = {
  submission: GetSubmissionWriting$Result;
  exam: WritingExam;
  user: User;
};

const GRADE = [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 1];

export default function Page({ submission, exam, user }: Props) {
  const loginStatus = useLoginStatus();
  const [grade, setGrade] = React.useState(submission.grade || 9);
  const [description, setDescription] = React.useState(
    submission.description || ""
  );
  const [notificationApi, notificationContextHolder] = useNotification();
  return (
    <div>
      {notificationContextHolder}
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <h1>Submission</h1>
        <div>{`Submission ID: ${submission.submissionId}`}</div>
        <div>{`Taken by: ${user.displayName}`}</div>
        {submission.answer.map((answer, index) => (
          <div key={index}>
            <RecoilRoot>
              <Editor
                value={JSON.parse(exam.tasks[index]) as Descendant[]}
                readOnly
                disableEditing
              />
            </RecoilRoot>
            <div className={styles.answer}>{answer}</div>
          </div>
        ))}
        {loginStatus?.loggedIn && loginStatus.isAgent ? (
          <div>
            <h2>Grade this exam</h2>
            <Flex.Row alignItems="center" gap="12px">
              <div>Select the Grade:</div>
              <Select
                value={grade}
                onChange={(value) => setGrade(value)}
                options={GRADE.map((grade) => ({
                  value: grade,
                  label: grade.toFixed(1)
                }))}
              />
            </Flex.Row>
            <TextArea
              style={{ marginTop: "20px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the comments.."
            ></TextArea>
            <Button
              style={{ marginTop: "20px" }}
              onClick={async () => {
                try {
                  await httpPost$SubmitWritingGrade(
                    `/api/v1/exam/writing/grade`,
                    {
                      submissionId: submission.submissionId,
                      grade,
                      description
                    }
                  );
                  notificationApi.success({
                    message: "Grading successfully!"
                  });
                } catch (error) {
                  console.error(error);
                  const displayableError = DisplayableError.from(error);
                  notificationApi.error({
                    message: displayableError.title,
                    description: displayableError.description
                  });
                }
              }}
            >
              {"Submit Grade"}
            </Button>
          </div>
        ) : submission.grade ? (
          <div className={styles.grade}>
            <h2>Grade</h2>
            <div>{`Your grade: ${submission.grade}`}</div>
            <div
              className={styles.comments}
            >{`Comments: ${submission.description}`}</div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
