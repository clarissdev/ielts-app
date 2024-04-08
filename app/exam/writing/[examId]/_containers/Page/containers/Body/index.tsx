"use client";

import React from "react";
import { Descendant } from "slate";

import PageNavigator from "./components/PageNavigator";
import SettingBar from "./components/SettingBar";
import TaskViewer from "./components/TaskViewer";

import { WritingExam } from "@/modules/business-types";

type Props = {
  initialExam: WritingExam;
};

export default function Body({ initialExam }: Props) {
  const [currentTask, setCurrentTask] = React.useState(0);
  const [hideScreen, setHideScreen] = React.useState(false);

  const [answer, setAnswer] = React.useState<string[]>(
    Array.from({ length: initialExam.tasks.length }, () => "")
  );

  return (
    <div>
      {initialExam.tasks.map((task, index) => {
        const taskContent = (JSON.parse(task) as Descendant[]) || [
          { type: "paragraph", children: [{ text: "not found" }] }
        ];
        return (
          <TaskViewer
            key={index}
            style={
              currentTask === index ? { display: "flex" } : { display: "none" }
            }
            topAdornment={
              <SettingBar
                examId={initialExam.examId}
                answer={answer}
                onChangeHideScreen={setHideScreen}
              />
            }
            bottomAdornment={
              <PageNavigator
                initialExam={initialExam}
                answer={answer}
                currentTask={currentTask}
                onChangeCurrentTask={setCurrentTask}
              />
            }
            initialTaskContent={taskContent}
            hideScreen={hideScreen}
            onChangeHideScreen={setHideScreen}
            answer={answer[index]}
            onChangeAnswer={(value) =>
              setAnswer((answer) =>
                answer.map((item, id) => (id === index ? value : item))
              )
            }
          />
        );
      })}
    </div>
  );
}

export function getWordCounts(value: string) {
  if (value === "") {
    return 0;
  }
  return value.trim().split(/\s+/).length;
}
