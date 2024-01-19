"use client";

import useNotification from "antd/es/notification/useNotification";
import cx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

import Navbar from "./containers/Navbar";
import TaskViewer from "./containers/TaskViewer";
import styles from "./index.module.scss";

import { SpeakingExam } from "@/modules/business-types";
import { httpPost$SubmitSpeaking } from "@/modules/commands/SubmitSpeaking/fetcher";
import { DisplayableError } from "@/modules/error";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  exam: SpeakingExam;
};

export const NUM_MILLISECONDS_PER_MINUTE = 1000 * 60;

export default function Page({ className, style, exam }: Props) {
  const router = useRouter();
  const [currentPart, setCurrentPart] = React.useState(0);
  const [answer, setAnswer] = React.useState<string[][]>([[], [], []]);
  const [notificationApi, notificationContextHolder] = useNotification();
  React.useEffect(() => {
    const submitAnswer = async () => {
      try {
        await httpPost$SubmitSpeaking("/api/v1/submit/speaking", {
          examId: exam.examId,
          answer
        });
        notificationApi.success({ message: "Submit exam successfully!" });
        router.push("/test");
      } catch (error) {
        const displayableError = DisplayableError.from(error);
        notificationApi.error({
          message: displayableError.title,
          description: displayableError.description
        });
      }
    };
    if (currentPart === 3) {
      void submitAnswer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPart]);
  return (
    <div className={cx(styles.container, className)} style={style}>
      <Navbar />
      {notificationContextHolder}
      <div className={styles.main}>
        {currentPart < 3 ? (
          <TaskViewer
            key={currentPart}
            currentPart={currentPart}
            questions={exam.tasks[currentPart]}
            onProceedNextTask={() =>
              setCurrentPart((currentPart) => currentPart + 1)
            }
            duration={
              currentPart === 0
                ? NUM_MILLISECONDS_PER_MINUTE * 4
                : currentPart === 1
                  ? NUM_MILLISECONDS_PER_MINUTE * 3
                  : NUM_MILLISECONDS_PER_MINUTE * 5
            }
            onAddAnswer={(blobId) =>
              setAnswer((answer) =>
                answer.map((task, index) =>
                  index === currentPart ? [...task, blobId] : task
                )
              )
            }
          />
        ) : undefined}
      </div>
    </div>
  );
}
