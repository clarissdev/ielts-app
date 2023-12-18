import React from "react";
import PageLayout$TwoColumns from "../../../../../../_components/PageLayout$TwoColumns";
import { Descendant } from "slate";
import styles from "./index.module.scss";
import Editor from "@/modules/app-ui/components/Editor";
import cx from "clsx";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  initialReadingContent: Descendant[];
  initialQuestionContent: Descendant[];
  expiredAt: number;
  topAdornment: React.ReactNode;
  bottomAdornment: React.ReactNode;
};

export default function TaskViewer({
  className,
  style,
  initialReadingContent,
  initialQuestionContent,
  topAdornment,
  bottomAdornment,
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
    </PageLayout$TwoColumns>
  );
}
