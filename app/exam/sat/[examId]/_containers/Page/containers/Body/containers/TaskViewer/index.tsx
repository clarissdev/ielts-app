import styles from "./index.module.scss";
import Flex from "@/modules/app-ui/components/Flex";
import { Descendant } from "slate";
import React from "react";
import Editor from "@/modules/app-ui/components/Editor";
import PageLayout$TwoColumns from "../../../../../../../../_components/PageLayout$TwoColumns";
import { Button } from "antd";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  currentTask: number;
  initialReadingContent: Descendant[];
  initialQuestionContent: Descendant[];

  onCheckmark: () => void;
};

export default function TaskViewer({
  className,
  style,
  currentTask,
  initialReadingContent,
  initialQuestionContent,
  onCheckmark
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
        <Flex.Cell flex="1 1 300px" padding="12px" className={styles.column}>
          <Editor
            className={styles.editor}
            value={readingContent}
            onChange={setReadingContent}
            disableEditing
          ></Editor>
        </Flex.Cell>
        <Flex.Cell flex="1 1 300px" padding="12px" className={styles.column}>
          <Flex.Row alignItems="center" gap="12px" paddingBottom="12px">
            <div className={styles.currentTask}>{currentTask}</div>
            <Button>Mark for review</Button>
          </Flex.Row>
          <Editor
            className={styles.editor}
            value={questionContent}
            onChange={setQuestionContent}
            disableEditing
          ></Editor>
        </Flex.Cell>
      </Flex.Row>
    </div>
  );
}
