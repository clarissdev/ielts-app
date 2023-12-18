"use client";
import React from "react";

import { ReadingExam } from "@/modules/business-types";
import "react-quill/dist/quill.snow.css";
import { Descendant } from "slate";
import TaskViewer from "./components/TaskViewer";
import { RecoilRoot } from "recoil";
import PageNavigator from "./components/PageNavigator";
import SettingBar from "./components/SettingBar";
import { getQuestionIdsFromTasks } from "@/modules/common-utils";

type Props = {
  initialExam: ReadingExam;
};

const NUM_MILLISECONDS_PER_HOURS = 3600000;

export default function Page({ initialExam }: Props) {
  const [currentTask, setCurrentTask] = React.useState(0);
  const [hideScreen, setHideScreen] = React.useState(false);
  const [showReview, setShowReview] = React.useState(false);
  const questionIdsFromTasks = getQuestionIdsFromTasks(
    initialExam.tasks.map((item) => item.numQuestions)
  );

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
          topAdornment={
            <SettingBar
              duration={NUM_MILLISECONDS_PER_HOURS}
              onChangeHideScreen={setHideScreen}
            />
          }
          bottomAdornment={
            <PageNavigator
              onReview={() => setShowReview(true)}
              initialExam={initialExam}
              currentTask={currentTask}
              onChangeCurrentTask={setCurrentTask}
            />
          }
          questionIdsFromTasks={questionIdsFromTasks}
          initialReadingContent={readingContent}
          initialQuestionContent={questionContent}
          expiredAt={0}
          hideScreen={hideScreen}
          onChangeHideScreen={setHideScreen}
          showReview={showReview}
          onChangeShowReview={setShowReview}
        />
      </RecoilRoot>
    );
  });
}
