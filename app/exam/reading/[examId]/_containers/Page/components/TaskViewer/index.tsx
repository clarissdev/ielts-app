import { Button } from "antd";
import cx from "clsx";
import React from "react";
import { Descendant } from "slate";

import PageLayout$TwoColumns from "../../../../../../_components/PageLayout$TwoColumns";

import styles from "./index.module.scss";

import Editor from "@/modules/app-ui/components/Editor";

type Props = {
  className?: string;
  style?: React.CSSProperties;

  initialReadingContent: Descendant[];
  initialQuestionContent: Descendant[];
  topAdornment: React.ReactNode;
  bottomAdornment: React.ReactNode;

  hideScreen?: boolean;
  onChangeHideScreen?: (value: boolean) => void;

  showReview?: boolean;
  onChangeShowReview?: (value: boolean) => void;
};

export default function TaskViewer({
  className,
  style,

  initialReadingContent,
  initialQuestionContent,
  topAdornment,
  bottomAdornment,

  hideScreen,
  onChangeHideScreen
}: Props) {
  const [readingContent, setReadingContent] = React.useState<Descendant[]>(
    initialReadingContent
  );
  const [questionContent, setQuestionContent] = React.useState<Descendant[]>(
    initialQuestionContent
  );

  return (
    <PageLayout$TwoColumns
      className={cx(styles.container, className)}
      style={style}
      topAdornment={topAdornment}
      bottomAdornment={bottomAdornment}
    >
      <PageLayout$TwoColumns.Left className={styles.column}>
        <Editor value={readingContent} onChange={setReadingContent} readOnly />
      </PageLayout$TwoColumns.Left>
      <PageLayout$TwoColumns.Right className={styles.column}>
        <Editor
          value={questionContent}
          onChange={setQuestionContent}
          readOnly
        />
      </PageLayout$TwoColumns.Right>
      {hideScreen ? (
        <div className={styles.hiddenSreen}>
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
