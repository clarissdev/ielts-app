"use client";

import "react-quill/dist/quill.snow.css";
import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";

import PageNavigator from "./components/PageNavigator";
import SettingBar from "./components/SettingBar";
import TaskViewer from "./components/TaskViewer";

import { ReadingExam } from "@/modules/business-types";

type Props = {
  initialExam: ReadingExam;
};

const NUM_MILLISECONDS_PER_HOURS = 3600000;

export default function Page({ initialExam }: Props) {
  const [currentTask, setCurrentTask] = React.useState(0);
  const [hideScreen, setHideScreen] = React.useState(false);
  const [showReview, setShowReview] = React.useState(false);

  return initialExam.tasks.map((task, index) => {
    const readingContent = (JSON.parse(
      task.readingContent
    ) as Descendant[]) || [
      { type: "paragraph", children: [{ text: "not found" }] }
    ];
    const questionContent = (JSON.parse(
      task.questionContent
    ) as Descendant[]) || [
      { type: "paragraph", children: [{ text: "not found" }] }
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
              initialExam={initialExam}
              currentTask={currentTask}
              onChangeCurrentTask={setCurrentTask}
            />
          }
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
