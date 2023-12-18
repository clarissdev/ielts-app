"use client";
import { WritingExam } from "@/modules/business-types";
import PageLayout$TwoColumns from "../../../../_components/PageLayout$TwoColumns";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./index.module.scss";
import Flex from "@/modules/app-ui/components/Flex";
import Image from "next/image";
import { getSrcFromImageFileHandle } from "@/modules/common-utils";
import { Button, Modal } from "antd";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import CountdownTimer from "@/modules/app-components/CountdownTimer";
import { httpPost$SubmitWriting } from "@/modules/commands/SubmitWriting/fetcher";
import useNotification from "antd/es/notification/useNotification";

type Props = {
  exam: WritingExam;
};

const NUM_MILLISECONDS_PER_HOURS = 3600000;

export default function Page({ exam }: Props) {
  const router = useRouter();
  const [currentTask, setCurrentTask] = React.useState(0);
  const currentImage = exam.tasks[currentTask].image;
  const searchParams = useSearchParams();
  const parsedDuration = z.coerce
    .number()
    .safeParse(searchParams.get("duration"));
  const [startTime] = React.useState(Date.now());
  const duration =
    parsedDuration.success && parsedDuration.data > 0
      ? parsedDuration.data
      : NUM_MILLISECONDS_PER_HOURS;
  const [notificationApi, notificationContextHolder] = useNotification();

  const [answer, setAnswer] = React.useState<string[]>(
    Array.from({ length: exam.tasks.length }, () => "")
  );
  const handleSubmit = async () => {
    try {
      const { submissionId } = await httpPost$SubmitWriting(
        "/api/v1/submit/writing",
        {
          examId: exam.examId,
          answer,
        }
      );
      notificationApi.success({ message: "Exam submitted successfully!" });
      router.push(`/submission/writing/${submissionId}`);
    } catch (error) {
      notificationApi.error({
        message: "Error",
        description: "An error has occured, please try again!",
      });
      router.push("/library");
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => void handleSubmit(), duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout$TwoColumns
      topAdornment={
        <Flex.Row
          padding="4px 12px"
          justifyContent="center"
          gap="12px"
          alignItems="center"
        >
          {notificationContextHolder}
          <div className={styles.countdownTimer}>
            <CountdownTimer
              className={styles.countdownTimer}
              duration={duration}
              start
              unstyled
              as="span"
            />
          </div>
          <Flex.Row gap="8px" justifyContent="center">
            <Button
              icon={<MdArrowLeft size="24px" />}
              disabled={currentTask === 0}
              onClick={() => setCurrentTask((task) => task - 1)}
            />
            <Button
              icon={<MdArrowRight size="24px" />}
              disabled={currentTask === exam.tasks.length - 1}
              onClick={() => setCurrentTask((task) => task + 1)}
            />
            <Button
              type="primary"
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure you want to submit the exam?",
                  onOk: handleSubmit,
                });
              }}
            >
              Submit
            </Button>
          </Flex.Row>
        </Flex.Row>
      }
    >
      <PageLayout$TwoColumns.Left>
        <ReactQuill
          readOnly
          modules={{ toolbar: false }}
          className={styles.quill}
          value={exam.tasks[currentTask].title}
        />
        <Flex.Row
          className={styles.imageContainer}
          alignItems="center"
          justifyContent="center"
        >
          {currentImage ? (
            <Image
              src={getSrcFromImageFileHandle(currentImage)}
              width={0}
              height={0}
              sizes="100vw"
              priority
              style={{ width: "60%", height: "auto" }} // optional
              alt={""}
            />
          ) : undefined}
        </Flex.Row>
      </PageLayout$TwoColumns.Left>
      <PageLayout$TwoColumns.Right>
        <Flex.Cell padding="12px 15px" style={{}}>
          <TextArea
            className={styles.textArea}
            value={answer[currentTask]}
            placeholder="Type your essay here.."
            onChange={(e) =>
              setAnswer(
                answer.map((item, index) =>
                  index === currentTask ? e.target.value : item
                )
              )
            }
          />
          <div style={{ marginTop: "12px" }}>{`Word counts: ${getWordCounts(
            answer[currentTask]
          )}`}</div>
        </Flex.Cell>
      </PageLayout$TwoColumns.Right>
    </PageLayout$TwoColumns>
  );
}

export function getWordCounts(value: string) {
  if (value === "") {
    return 0;
  }
  return value.trim().split(/\s+/).length;
}
