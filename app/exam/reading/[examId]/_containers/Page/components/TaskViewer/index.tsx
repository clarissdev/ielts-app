import React from "react";
import PageLayout$TwoColumns from "../../../../../../_components/PageLayout$TwoColumns";
import { Descendant } from "slate";
import styles from "./index.module.scss";
import Editor from "@/modules/app-ui/components/Editor";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  initialReadingContent: Descendant[];
  initialQuestionContent: Descendant[];
  expiredAt: number;
  topAdornment: React.ReactNode;
};

export default function TaskViewer({
  className,
  style,
  initialReadingContent,
  initialQuestionContent,
  topAdornment,
}: Props) {
  const [readingContent, setReadingContent] = React.useState<Descendant[]>(
    initialReadingContent
  );
  const [questionContent, setQuestionContent] = React.useState<Descendant[]>(
    initialQuestionContent
  );
  return (
    <PageLayout$TwoColumns
      className={className}
      style={style}
      topAdornment={topAdornment}
    >
      <PageLayout$TwoColumns.Left className={styles.leftRow}>
        <div className={styles.leftContent}>
          <Editor
            value={readingContent}
            onChange={setReadingContent}
            readOnly
          />
        </div>
      </PageLayout$TwoColumns.Left>
      <PageLayout$TwoColumns.Right></PageLayout$TwoColumns.Right>
    </PageLayout$TwoColumns>
  );
}
