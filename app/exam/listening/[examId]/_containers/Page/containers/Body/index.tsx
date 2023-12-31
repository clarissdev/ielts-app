"use client";
import useNotification from "antd/es/notification/useNotification";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilValue } from "recoil";
import { Descendant } from "slate";

import PageNavigator from "./components/PageNavigator";
import SettingBar from "./components/SettingBar";
import TaskViewer from "./components/TaskViewer";
import styles from "./index.module.scss";

import { answersState } from "@/modules/app-ui/components/Editor/utils";
import Flex from "@/modules/app-ui/components/Flex";
import { ListeningExam } from "@/modules/business-types";
import { httpPost$SubmitListening } from "@/modules/commands/SubmitListening/fetcher";
import { getQuestionId, range } from "@/modules/common-utils";
import { DisplayableError } from "@/modules/error";

type Props = {
  initialExam: ListeningExam;
};

const NUM_MILLISECONDS_PER_40_MINUTES = 2400000;

export default function Body({ initialExam }: Props) {
  const router = useRouter();
  const [currentTask, setCurrentTask] = React.useState(0);
  const [hideScreen, setHideScreen] = React.useState(false);
  const answers = useRecoilValue(answersState);
  const [notificationApi, notificationContextHolder] = useNotification();

  const [isStarted, setIsStarted] = React.useState(true);
  const handleSubmit = async () => {
    try {
      const numQuestions = initialExam.tasks.reduce(
        (accumulator, task) => accumulator + task.numQuestions,
        0
      );
      const answer = range(numQuestions).map(
        (id) => answers[getQuestionId(id + 1)] || ""
      );
      const { submissionId } = await httpPost$SubmitListening(
        "/api/v1/submit/listening",
        {
          examId: initialExam.examId,
          answer
        }
      );
      router.push(`/submission/listening/${submissionId}`);
      notificationApi.success({ message: "Submit exam successfully!" });
    } catch (error) {
      const displayableError = DisplayableError.from(error);
      notificationApi.error({
        message: displayableError.title,
        description: displayableError.description
      });
    }
  };
  return (
    <div>
      {notificationContextHolder}
      {initialExam.tasks.map((task, index) => {
        const questionContent = (JSON.parse(
          task.questionContent
        ) as Descendant[]) || [
          { type: "paragraph", children: [{ text: "not found" }] }
        ];
        return (
          <Flex.Cell
            style={
              currentTask === index ? { display: "block" } : { display: "none" }
            }
            className={styles.taskViewerContainer}
            flex="1 1 0"
            key={index}
          >
            <TaskViewer
              topAdornment={
                <SettingBar
                  listeningSrc={initialExam.listeningSrc}
                  duration={NUM_MILLISECONDS_PER_40_MINUTES}
                  onChangeHideScreen={setHideScreen}
                  onSubmit={handleSubmit}
                />
              }
              bottomAdornment={
                <PageNavigator
                  initialExam={initialExam}
                  currentTask={currentTask}
                  onChangeCurrentTask={setCurrentTask}
                />
              }
              initialQuestionContent={questionContent}
              hideScreen={hideScreen}
              onChangeHideScreen={setHideScreen}
              isStarted={isStarted}
              onChangeIsStarted={setIsStarted}
            />
          </Flex.Cell>
        );
      })}
    </div>
  );
}
