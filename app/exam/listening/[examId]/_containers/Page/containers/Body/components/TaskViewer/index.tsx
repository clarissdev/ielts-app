import { Button } from "antd";
import React from "react";
import { Descendant } from "slate";

import PageLayout$TwoColumns from "../../../../../../../../_components/PageLayout$TwoColumns";

import styles from "./index.module.scss";

import Editor from "@/modules/app-ui/components/Editor";

type Props = {
  className?: string;
  style?: React.CSSProperties;

  initialQuestionContent: Descendant[];
  topAdornment?: React.ReactNode;
  bottomAdornment?: React.ReactNode;

  hideScreen?: boolean;
  onChangeHideScreen?: (value: boolean) => void;

  isStarted: boolean;
  onChangeIsStarted: (value: boolean) => void;
};

export default function TaskViewer({
  className,
  style,
  initialQuestionContent,
  topAdornment,
  bottomAdornment,
  hideScreen,
  onChangeHideScreen,
  isStarted,
  onChangeIsStarted
}: Props) {
  const [questionContent, setQuestionContent] = React.useState<Descendant[]>(
    initialQuestionContent
  );
  return (
    <PageLayout$TwoColumns
      className={className}
      style={style}
      topAdornment={topAdornment}
      bottomAdornment={bottomAdornment}
    >
      <PageLayout$TwoColumns.Left className={styles.column}>
        <Editor
          value={questionContent}
          onChange={setQuestionContent}
          readOnly
        />
      </PageLayout$TwoColumns.Left>
      {isStarted ? (
        <div className={styles.hiddenScreen}>
          <div className={styles.title}>Click here to start the exam</div>
          <Button
            onClick={() => {
              onChangeIsStarted(false);
              const audio = document.getElementById(
                "audio"
              ) as HTMLAudioElement;
              audio.play();
            }}
          >
            Start
          </Button>
        </div>
      ) : undefined}

      {hideScreen ? (
        <div className={styles.hiddenScreen}>
          <div className={styles.title}>{"Pause exam"}</div>
          <div>{"Your answer have been stored."}</div>
          <div>
            {
              "Please note that the clock is still running. The time has not been paused."
            }
          </div>
          <div>
            {"If you wish to leave the room, please tell your invigilator."}
          </div>
          <div>{"Click on the button below to go back to your test."}</div>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ marginTop: "12px" }}
              onClick={() => onChangeHideScreen?.(false)}
            >
              Resume Test
            </Button>
          </div>
        </div>
      ) : undefined}
    </PageLayout$TwoColumns>
  );
}
