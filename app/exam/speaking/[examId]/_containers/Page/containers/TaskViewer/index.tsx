import cx from "clsx";
import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";

import AudioRecorder from "../../../../../_containers/Page/containers/AudioRecorder";

import styles from "./index.module.scss";

import CountdownTimer from "@/modules/app-components/CountdownTimer";
import Editor from "@/modules/app-ui/components/Editor";
import Flex from "@/modules/app-ui/components/Flex";
import { httpPost$UploadFile } from "@/modules/commands/UploadFile/fetcher";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  currentPart: number;
  questions: string[];
  duration: number;
  onProceedNextTask: () => void;
  onAddAnswer: (blobId: string) => void;
};

export default function TaskViewer({
  className,
  style,
  questions,
  currentPart,
  duration,
  onProceedNextTask,
  onAddAnswer
}: Props) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const mediaRecorder = React.useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);
  const onStop = async (blob: Blob, mustProceedNextTask: boolean) => {
    const file = new File([blob], `Part 1 question ${currentQuestion + 1}`);

    const result = await httpPost$UploadFile("/api/v1/all-files/upload", {
      contentType: "audio/webm"
    });

    const formData = new FormData();
    formData.append("Content-Type", "audio/webm");
    formData.append("file", file);

    await fetch(result.presignedUrl, {
      method: "PUT",
      body: file
    });

    onAddAnswer(result.file.blob.blobId);

    if (!mustProceedNextTask && currentQuestion + 1 < questions.length) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
    } else {
      onProceedNextTask();
    }
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (mediaRecorder.current?.state === "recording") {
        mediaRecorder.current.stop();

        mediaRecorder.current.ondataavailable = async (event) => {
          if (typeof event.data !== "undefined" && event.data.size > 0) {
            const audioChunks = [event.data];
            const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
            await onStop?.(audioBlob, true);
            setAudioChunks([]);
          } else {
            onProceedNextTask();
          }
        };
      } else {
        onProceedNextTask();
      }
    }, duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={cx(styles.container, className)} style={style}>
      <h1 className={styles.colorPrimary}>{`PART ${
        currentPart === 0 ? "ONE" : currentPart === 1 ? "TWO" : "THREE"
      }`}</h1>
      <div className={styles.colorPrimary}>
        You have <CountdownTimer duration={duration} unstyled as={"span"} />
      </div>
      <Flex.Row gap="20px" paddingTop="20px" style={{ textAlign: "initial" }}>
        <Flex.Cell flex="1 1 0" padding="0 20px" className={styles.leftColumn}>
          <RecoilRoot key={currentQuestion}>
            <Editor
              readOnly
              disableEditing
              value={JSON.parse(questions[currentQuestion]) as Descendant[]}
            />
          </RecoilRoot>
        </Flex.Cell>
        <Flex.Cell flex="1 1 0">
          <AudioRecorder
            mediaRecorder={mediaRecorder}
            audioChunks={audioChunks}
            onChangeAudioChunks={setAudioChunks}
            onStop={async (blob) => await onStop(blob, false)}
          />
        </Flex.Cell>
      </Flex.Row>
    </div>
  );
}
