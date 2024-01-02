import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Descendant } from "slate";

import PageLayout$TwoColumns from "../../../../../../../../_components/PageLayout$TwoColumns";

import styles from "./index.module.scss";

import Editor from "@/modules/app-ui/components/Editor";
import Flex from "@/modules/app-ui/components/Flex";

type Props = {
  className?: string;
  style?: React.CSSProperties;

  topAdornment: React.ReactNode;
  bottomAdornment: React.ReactNode;
  initialTaskContent: Descendant[];

  hideScreen: boolean;
  onChangeHideScreen: (value: boolean) => void;

  answer: string;
  onChangeAnswer: (value: string) => void;
};

export default function TaskViewer({
  className,
  style,
  initialTaskContent,
  topAdornment,
  bottomAdornment,

  hideScreen,
  onChangeHideScreen,
  answer,
  onChangeAnswer
}: Props) {
  return (
    <PageLayout$TwoColumns
      className={className}
      style={style}
      topAdornment={topAdornment}
      bottomAdornment={bottomAdornment}
    >
      <PageLayout$TwoColumns.Left className={styles.column}>
        <Editor value={initialTaskContent} disableEditing />
      </PageLayout$TwoColumns.Left>
      <PageLayout$TwoColumns.Right className={styles.column}>
        <Flex.Cell padding="12px 15px" style={{}}>
          <TextArea
            className={styles.textArea}
            value={answer}
            placeholder="Type your essay here.."
            onChange={(e) => onChangeAnswer(e.target.value)}
          />
          <div style={{ marginTop: "12px" }}>{`Word counts: ${getWordCounts(
            answer
          )}`}</div>
        </Flex.Cell>
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

export function getWordCounts(value: string) {
  if (value === "") {
    return 0;
  }
  return value.trim().split(/\s+/).length;
}
