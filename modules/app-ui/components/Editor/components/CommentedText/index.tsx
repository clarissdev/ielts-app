import styles from "./index.module.scss";
import { useSlateStatic } from "slate-react";
import { useRecoilStateLoadable, useSetRecoilState } from "recoil";
import {
  commentThreadsState,
  getSmallestCommentThreadAtTextNode,
} from "../../utils";
import { Text } from "slate";
import { Popover } from "antd";
import TextArea from "antd/es/input/TextArea";

type Props = {
  textNode: Text;
  children: React.ReactNode;
  threadId: string;
};

export default function CommentedText({ textNode, children, threadId }: Props) {
  const editor = useSlateStatic();

  const [commentLoadable, setComment] = useRecoilStateLoadable<string | null>(
    commentThreadsState(threadId)
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <Popover
      content={
        <div className={styles.container}>
          <TextArea
            value={commentLoadable.contents || ""}
            onChange={onChange}
          ></TextArea>
        </div>
      }
      trigger="click"
    >
      <span className={styles.isActive}>{children}</span>
    </Popover>
  );
}
