"use client";
import React from "react";

import { ReadingExam } from "@/modules/business-types";
import "react-quill/dist/quill.snow.css";
import { Descendant } from "slate";
import TaskViewer from "./components/TaskViewer";
import { RecoilRoot } from "recoil";
import PageNavigator from "./components/PageNavigator";
import SettingBar from "./components/SettingBar";

type Props = {
  initialExam: ReadingExam;
};

const NUM_MILLISECONDS_PER_HOURS = 3600000;

export default function Page({ initialExam }: Props) {
  const [currentTask, setCurrentTask] = React.useState(0);

  return initialExam.tasks.map((task, index) => {
    const readingContent = (JSON.parse(
      task.readingContent
    ) as Descendant[]) || [
      { type: "paragraph", children: [{ text: "not found" }] },
    ];
    const questionContent = (JSON.parse(
      task.questionContent
    ) as Descendant[]) || [
      { type: "paragraph", children: [{ text: "not found" }] },
    ];

    return (
      <RecoilRoot key={index}>
        <TaskViewer
          style={
            currentTask === index ? { display: "flex" } : { display: "none" }
          }
          topAdornment={<SettingBar duration={NUM_MILLISECONDS_PER_HOURS} />}
          bottomAdornment={
            <PageNavigator
              initialExam={initialExam}
              onChangeCurrentTask={setCurrentTask}
            />
          }
          initialReadingContent={readingContent}
          initialQuestionContent={questionContent}
          expiredAt={0}
        />
      </RecoilRoot>
    );
  });
}
