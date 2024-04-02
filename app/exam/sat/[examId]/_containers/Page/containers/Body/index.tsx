import useNotification from "antd/es/notification/useNotification";
import React from "react";
import { useRecoilState } from "recoil";
import { Descendant } from "slate";

import SettingBar from "../../../../../../reading/[examId]/_containers/Page/components/SettingBar";

import PageNavigator from "./containers/PageNavigator";
import TaskViewer from "./containers/TaskViewer";

import { answersState } from "@/modules/app-ui/components/Editor/utils";
import Flex from "@/modules/app-ui/components/Flex";
import { SatExam } from "@/modules/business-types";

type Props = {
  initialExam: SatExam;
};

export default function Body({ initialExam }: Props) {
  const [result, setResult] = React.useState(0);
  const [hideScreen, setHideScreen] = React.useState(false);
  const answers = useRecoilState(answersState);
  const [notificationApi, notificationContextHolder] = useNotification();

  const [currentModule, setCurrentModule] = React.useState(0);
  const [currentTask, setCurrentTask] = React.useState(0);

  return (
    <Flex.Col minHeight="100vh">
      <SettingBar
        duration={initialExam.modules[currentModule].timeLimit}
        onSubmit={async () => {}}
        onChangeHideScreen={async () => {}}
      />
      <Flex.Cell flex="1 1 0">
        {initialExam.modules[currentModule].tasks.map((task, index) => {
          const readingContent = (JSON.parse(
            task.readingContent.replace(/\n/g, "\\n")
          ) as Descendant[]) || [
            { type: "paragraph", children: [{ text: "not found" }] }
          ];

          const questionContent = (JSON.parse(
            task.questionContent.replace(/\n/g, "\\n")
          ) as Descendant[]) || [
            { type: "paragraph", children: [{ text: "not found" }] }
          ];
          return (
            <TaskViewer
              key={index}
              currentTask={index + 1}
              style={{ display: index === currentTask ? "block" : "none" }}
              initialReadingContent={readingContent}
              initialQuestionContent={questionContent}
              onCheckmark={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          );
        })}
      </Flex.Cell>
      <PageNavigator
        currentModule={currentModule}
        initialExam={initialExam}
        currentTask={currentTask}
        onChangeCurrentTask={setCurrentTask}
      />
    </Flex.Col>
  );
}
