"use client";
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
import { getQuestionId, range } from "@/modules/common-utils";

type Props = {
  initialExam: ListeningExam;
};

const NUM_MILLISECONDS_PER_40_MINUTES = 2400000;

export default function Body({ initialExam }: Props) {
  const [currentTask, setCurrentTask] = React.useState(0);
  const [hideScreen, setHideScreen] = React.useState(false);
  const answers = useRecoilValue(answersState);

  const [isStarted, setIsStarted] = React.useState(true);
  const buttonSubmitRef = React.useRef<HTMLButtonElement>(null);

  const numQuestions = initialExam.tasks.reduce(
    (accumulator, task) => accumulator + task.numQuestions,
    0
  );
  const [focus, setFocus] = React.useState<number | undefined>();
  const [checkpoints, setCheckpoints] = React.useState<boolean[]>(
    Array.from({ length: numQuestions + 1 }, () => false)
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      buttonSubmitRef.current?.click();
    }, NUM_MILLISECONDS_PER_40_MINUTES);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
                  onChangeHideScreen={setHideScreen}
                  answer={range(numQuestions).map(
                    (id) => answers[getQuestionId(id + 1)] || ""
                  )}
                  examId={initialExam.examId}
                  duration={NUM_MILLISECONDS_PER_40_MINUTES}
                  buttonSubmitRef={index === 0 ? buttonSubmitRef : null}
                />
              }
              bottomAdornment={
                <PageNavigator
                  initialExam={initialExam}
                  currentTask={currentTask}
                  onChangeCurrentTask={setCurrentTask}
                  checkpoints={checkpoints}
                  onMarkCheckpoint={(value) =>
                    setCheckpoints((checkpoints) =>
                      checkpoints.map((item, index) =>
                        index === value ? !item : item
                      )
                    )
                  }
                  focus={focus}
                  onChangeFocus={setFocus}
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
