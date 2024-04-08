"use client";

import useNotification from "antd/es/notification/useNotification";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Descendant } from "slate";
import { z } from "zod";

import PageNavigator from "./components/PageNavigator";
import TaskViewer from "./components/TaskViewer";

import { WritingExam } from "@/modules/business-types";
import { httpPost$SubmitWriting } from "@/modules/commands/SubmitWriting/fetcher";
import SettingBar from "./components/SettingBar";

type Props = {
  initialExam: WritingExam;
};

const NUM_MILLISECONDS_PER_HOURS = 3600000;

export default function Body({ initialExam }: Props) {
  const router = useRouter();
  const [currentTask, setCurrentTask] = React.useState(0);
  const searchParams = useSearchParams();
  const parsedDuration = z.coerce
    .number()
    .safeParse(searchParams.get("duration"));
  const duration =
    parsedDuration.success && parsedDuration.data > 0
      ? parsedDuration.data
      : NUM_MILLISECONDS_PER_HOURS;
  const [notificationApi, notificationContextHolder] = useNotification();
  const [hideScreen, setHideScreen] = React.useState(false);

  const [answer, setAnswer] = React.useState<string[]>(
    Array.from({ length: initialExam.tasks.length }, () => "")
  );

  return (
    <div>
      {notificationContextHolder}
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
