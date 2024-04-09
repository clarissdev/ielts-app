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

const NUM_MILLISECONDS_PER_HOURS = 3600000;

export default function Body({ initialExam }: Props) {
  const [currentTask, setCurrentTask] = React.useState(0);
  const [hideScreen, setHideScreen] = React.useState(false);
  const buttonSubmitRef = React.useRef<HTMLButtonElement>(null);

  const [answer, setAnswer] = React.useState<string[]>(
    Array.from({ length: initialExam.tasks.length }, () => "")
  );

  React.useEffect(() => {
    const timer = setTimeout(
      () => buttonSubmitRef.current?.click(),
      NUM_MILLISECONDS_PER_HOURS
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NUM_MILLISECONDS_PER_HOURS]);

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
                duration={NUM_MILLISECONDS_PER_HOURS}
                buttonSubmitRef={buttonSubmitRef}
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
