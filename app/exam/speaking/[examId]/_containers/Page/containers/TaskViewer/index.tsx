import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";

import AudioRecorder from "../../../../../_containers/Page/containers/AudioRecorder";

import CountdownTimer from "@/modules/app-components/CountdownTimer";
import Editor from "@/modules/app-ui/components/Editor";
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
  React.useEffect(() => {
    const timer = setTimeout(() => onProceedNextTask(), duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={className} style={style}>
      <h1>{`Part ${
        currentPart === 0 ? "One" : currentPart === 1 ? "Two" : "Three"
      }`}</h1>
      <div>
        You have <CountdownTimer duration={duration} unstyled as={"span"} />
      </div>
      <RecoilRoot key={currentQuestion}>
        <Editor
          readOnly
          disableEditing
          value={JSON.parse(questions[currentQuestion]) as Descendant[]}
        />
      </RecoilRoot>
      <AudioRecorder
        onStop={async (blob) => {
          const file = new File(
            [blob],
            `Part 1 question ${currentQuestion + 1}`
          );

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

          if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((currentQuestion) => currentQuestion + 1);
          } else {
            onProceedNextTask();
          }
        }}
      />
    </div>
  );
}
