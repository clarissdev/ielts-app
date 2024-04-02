import styles from "./index.module.scss";
import Flex from "@/modules/app-ui/components/Flex";
import { Descendant } from "slate";
import React from "react";
import Editor from "@/modules/app-ui/components/Editor";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  currentTask: number;
  initialReadingContent: Descendant[];
  initialQuestionContent: Descendant[];
};

export default function TaskViewer({
  className,
  style,
  currentTask,
  initialReadingContent,
  initialQuestionContent
}: Props) {
  const [readingContent, setReadingContent] = React.useState<Descendant[]>(
    initialReadingContent
  );
  const [questionContent, setQuestionContent] = React.useState<Descendant[]>(
    initialQuestionContent
  );
  return (
    <div className={className} style={style}>
      <Flex.Row>
        <Flex.Col padding="12px" flex="1 1 400px">
          <strong>{`Question ${currentTask}`}</strong>
          <Editor
            className={styles.editor}
            value={readingContent}
            onChange={setReadingContent}
            disableEditing
          ></Editor>
        </Flex.Col>
        <Flex.Col padding="12px" flex="1 1 400px">
          <Editor
            className={styles.editor}
            value={questionContent}
            onChange={setQuestionContent}
            disableEditing
          ></Editor>
        </Flex.Col>
      </Flex.Row>
    </div>
  );
}
