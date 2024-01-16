"use client";

import { Select, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import useNotification from "antd/es/notification/useNotification";
import { useRouter } from "next/navigation";
import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import Editor from "@/modules/app-ui/components/Editor";
import Flex from "@/modules/app-ui/components/Flex";
import { SpeakingExam, User } from "@/modules/business-types";
import { GetSubmissionSpeaking$Result } from "@/modules/commands/GetSubmissionSpeaking/typing";
import { httpPost$SubmitSpeakingGrade } from "@/modules/commands/SubmitSpeakingGrade/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { range } from "@/modules/common-utils";
import { DisplayableError } from "@/modules/error";

type Props = {
  submission: GetSubmissionSpeaking$Result;
  exam: SpeakingExam;
  user: User;
};

const GRADE = [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 1];

export default function Page({ submission, exam, user }: Props) {
  const router = useRouter();
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
        {range(3).map((taskIndex) => (
          <div key={taskIndex}>
            <h2>{`Part ${taskIndex + 1}`}</h2>
            {exam.tasks[taskIndex].map((task, index) => (
              <div key={index}>
                <RecoilRoot>
                  <Editor
                    value={JSON.parse(task) as Descendant[]}
                    readOnly
                    disableEditing
                  />
                </RecoilRoot>
                {submission.answer[taskIndex][index] != null ? (
                  <audio controls>
                    <source
                      src={`https://theenglishcoach.vn/blobs/${submission.answer[taskIndex][index]}.wav`}
                    ></source>
                  </audio>
                ) : (
                  <div>No answer</div>
                )}
              </div>
            ))}
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
                  await httpPost$SubmitSpeakingGrade(
                    `/api/v1/exam/speaking/grade`,
                    {
                      submissionId: submission.submissionId,
                      grade,
                      description
                    }
                  );
                  notificationApi.success({
                    message: "Grading successfully!"
                  });
                  router.push("/admin/grade-speaking");
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
