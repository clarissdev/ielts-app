import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";
import { z } from "zod";

import AudioRecorder from "../../../../../_containers/Page/containers/AudioRecorder";
import { toRatio, uploadWithProgress } from "../../utils";

import CountdownTimer from "@/modules/app-components/CountdownTimer";
import Editor from "@/modules/app-ui/components/Editor";
import { httpPost$UploadFile } from "@/modules/commands/UploadFile/fetcher";
import { assert$DisplayableError } from "@/modules/error";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  questions: string[];
  onProceedNextTask: () => void;
};

const NUM_MILLISECONDS_PER_FIVE_MINUTES = 1000 * 60 * 5;

const ContentType = z.enum(["audio/webm"]);

export default function PartOne({
  className,
  style,
  questions,
  onProceedNextTask
}: Props) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(
      () => onProceedNextTask(),
      NUM_MILLISECONDS_PER_FIVE_MINUTES
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={className} style={style}>
      <h1>Part One</h1>
      <div>
        You have{" "}
        <CountdownTimer
          duration={NUM_MILLISECONDS_PER_FIVE_MINUTES}
          unstyled
          as={"span"}
        />
      </div>
      <RecoilRoot>
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
          const contentTypeSP = ContentType.safeParse(file.type);
          assert$DisplayableError(contentTypeSP.success, {
            title: `Unsupported content type: ${file.type}`,
            description: [
              "Currently, we only support PNG, JPG, GIF, WEBP, MP4, SVG, HTML."
            ].join("\n"),
            cause: contentTypeSP
          });

          const result = await httpPost$UploadFile("/api/v1/all-files/upload", {
            contentType: contentTypeSP.data
          });

          const formData = new FormData();
          for (const [key, value] of Object.entries(
            result.presignedPost.fields
          )) {
            formData.append(key, value);
          }
          formData.append("file", file);

          await uploadWithProgress(result.presignedPost.url, formData, {
            onProgress: (progress) => {
              const ratio = toRatio(progress);
              // setBusy(ratio != null ? { progress: ratio } : true);
            }
          });
        }}
      />
    </div>
  );
}
