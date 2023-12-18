import React from "react";
import PageLayout$TwoColumns from "../../../../../../_components/PageLayout$TwoColumns";
import { Descendant } from "slate";
import styles from "./index.module.scss";
import Editor from "@/modules/app-ui/components/Editor";
import cx from "clsx";
import { Button } from "antd";
import { answersState } from "@/modules/app-ui/components/Editor/utils";
import { useRecoilValue } from "recoil";
import Flex from "@/modules/app-ui/components/Flex";
import { getQuestionId } from "@/modules/common-utils";

type Props = {
  className?: string;
  style?: React.CSSProperties;

  questionIdsFromTasks: number[][];
  initialReadingContent: Descendant[];
  initialQuestionContent: Descendant[];
  expiredAt: number;
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

  questionIdsFromTasks,
  initialReadingContent,
  initialQuestionContent,
  topAdornment,
  bottomAdornment,

  hideScreen,
  onChangeHideScreen,

  showReview,
  onChangeShowReview,
}: Props) {
  const [readingContent, setReadingContent] = React.useState<Descendant[]>(
    initialReadingContent
  );
  const [questionContent, setQuestionContent] = React.useState<Descendant[]>(
    initialQuestionContent
  );

  const answers = useRecoilValue(answersState);

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

      {showReview ? (
        <div className={styles.hiddenSreen}>
          <div className={styles.title}>{"Review"}</div>
          <Flex.Row
            justifyContent="space-between"
            maxWidth="700px"
            style={{ margin: "0 auto" }}
          >
            {questionIdsFromTasks.map((task, index) => (
              <Flex.Col
                paddingTop="24px"
                key={index}
                flex="1 1 0"
                justifyContent="left"
                style={{ textAlign: "left" }}
              >
                <div className={styles.title}>{`Task ${index + 1}: `}</div>
                {task.map((index) => (
                  <div key={index}>{`Q${index}: ${
                    answers[getQuestionId(index)] || ""
                  }`}</div>
                ))}
              </Flex.Col>
            ))}
          </Flex.Row>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ marginTop: "12px" }}
              onClick={() => onChangeShowReview?.(false)}
            >
              Resume Test
            </Button>
          </div>
        </div>
      ) : undefined}
    </PageLayout$TwoColumns>
  );
}
