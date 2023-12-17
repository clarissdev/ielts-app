"use client";
import { Button } from "antd";
import { useSearchParams } from "next/navigation";
import React from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { z } from "zod";

import styles from "./index.module.scss";

import CountdownTimer from "@/modules/app-components/CountdownTimer";
import Flex from "@/modules/app-ui/components/Flex";
import { ReadingExam } from "@/modules/business-types";
import "react-quill/dist/quill.snow.css";
import { Descendant } from "slate";
import TaskViewer from "./components/TaskViewer";
import { RecoilRoot, useRecoilValue } from "recoil";
import { getQuestionId, range } from "@/modules/common-utils";
import { answersState } from "@/modules/app-ui/components/Editor/utils";
import PageNavigator from "./components/PageNavigator";

type Props = {
  initialExam: ReadingExam;
};

const NUM_MILLISECONDS_PER_HOURS = 3600000;

export default function Page({ initialExam }: Props) {
  const [currentTask, setCurrentTask] = React.useState(0);
  const searchParams = useSearchParams();
  const parsedDuration = z.number().safeParse(searchParams.get("duration"));
  const duration = parsedDuration.success
    ? parsedDuration.data
    : NUM_MILLISECONDS_PER_HOURS;
  const [startTime] = React.useState(Date.now());

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
            <Flex.Row
              padding="4px 12px"
              justifyContent="center"
              gap="12px"
              alignItems="center"
            >
              <div className={styles.countdownTimer}>
                <CountdownTimer
                  className={styles.countdownTimer}
                  expiredAt={startTime + duration}
                  unstyled
                  as="span"
                />
                <span>{" remaining"}</span>
              </div>
              <Flex.Row gap="8px" justifyContent="center">
                <Button
                  icon={<MdArrowLeft size="24px" />}
                  disabled={currentTask === 0}
                  onClick={() => setCurrentTask((task) => task - 1)}
                />
                <Button
                  icon={<MdArrowRight size="24px" />}
                  disabled={currentTask === initialExam.tasks.length - 1}
                  onClick={() => setCurrentTask((task) => task + 1)}
                />
                <Button type="primary">Submit</Button>
              </Flex.Row>
            </Flex.Row>
          }
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
