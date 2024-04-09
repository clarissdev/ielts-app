import React from "react";
import { useRecoilValue } from "recoil";
import { Descendant } from "slate";

import PageNavigator from "../../components/PageNavigator";
import SettingBar from "../../components/SettingBar";
import TaskViewer from "../../components/TaskViewer";

import { answersState } from "@/modules/app-ui/components/Editor/utils";
import { ReadingExam } from "@/modules/business-types";
import { getQuestionId, range } from "@/modules/common-utils";

type Props = {
  initialExam: ReadingExam;
};

const NUM_MILLISECONDS_PER_HOURS = 3600000;

export default function Body({ initialExam }: Props) {
  const [currentTask, setCurrentTask] = React.useState(0);
  const [hideScreen, setHideScreen] = React.useState(false);
  const [showReview, setShowReview] = React.useState(false);
  const answers = useRecoilValue(answersState);
  const numQuestions = initialExam.tasks.reduce(
    (accumulator, task) => accumulator + task.numQuestions,
    0
  );
  const [focus, setFocus] = React.useState<number | undefined>();
  const [checkpoints, setCheckpoints] = React.useState<boolean[]>(
    Array.from({ length: numQuestions + 1 }, () => false)
  );
  const buttonSubmitRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      buttonSubmitRef.current?.click();
    }, NUM_MILLISECONDS_PER_HOURS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {initialExam.tasks.map((task, index) => {
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
          <TaskViewer
            key={index}
            style={
              currentTask === index ? { display: "flex" } : { display: "none" }
            }
            topAdornment={
              <SettingBar
                onChangeHideScreen={setHideScreen}
                answer={range(numQuestions).map(
                  (id) => answers[getQuestionId(id + 1)] || ""
                )}
                examId={initialExam.examId}
                duration={NUM_MILLISECONDS_PER_HOURS}
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
            initialReadingContent={readingContent}
            initialQuestionContent={questionContent}
            hideScreen={hideScreen}
            onChangeHideScreen={setHideScreen}
            showReview={showReview}
            onChangeShowReview={setShowReview}
          />
        );
      })}
    </div>
  );
}
