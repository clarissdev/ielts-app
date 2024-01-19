import useNotification from "antd/es/notification/useNotification";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilValue } from "recoil";
import { Descendant } from "slate";

import PageNavigator from "../../components/PageNavigator";
import SettingBar from "../../components/SettingBar";
import TaskViewer from "../../components/TaskViewer";

import { answersState } from "@/modules/app-ui/components/Editor/utils";
import { ReadingExam } from "@/modules/business-types";
import { httpPost$SubmitReading } from "@/modules/commands/SubmitReading/fetcher";
import { getQuestionId, range } from "@/modules/common-utils";
import { DisplayableError } from "@/modules/error";

type Props = {
  initialExam: ReadingExam;
};

const NUM_MILLISECONDS_PER_HOURS = 3600000;

export default function Body({ initialExam }: Props) {
  const router = useRouter();
  const [currentTask, setCurrentTask] = React.useState(0);
  const [hideScreen, setHideScreen] = React.useState(false);
  const [showReview, setShowReview] = React.useState(false);
  const answers = useRecoilValue(answersState);
  const [notificationApi, notificationContextHolder] = useNotification();
  const handleSubmit = async () => {
    try {
      const numQuestions = initialExam.tasks.reduce(
        (accumulator, task) => accumulator + task.numQuestions,
        0
      );
      const answer = range(numQuestions).map(
        (id) => answers[getQuestionId(id + 1)] || ""
      );
      await httpPost$SubmitReading("/api/v1/submit/reading", {
        examId: initialExam.examId,
        answer
      });
      router.push(`/test`);
      notificationApi.success({ message: "Submit exam successfully!" });
    } catch (error) {
      const displayableError = DisplayableError.from(error);
      notificationApi.error({
        message: displayableError.title,
        description: displayableError.description
      });
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(
      () => void handleSubmit(),
      NUM_MILLISECONDS_PER_HOURS
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {notificationContextHolder}
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
                duration={NUM_MILLISECONDS_PER_HOURS}
                onChangeHideScreen={setHideScreen}
                onSubmit={handleSubmit}
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
