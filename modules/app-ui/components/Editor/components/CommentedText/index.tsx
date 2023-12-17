import styles from "./index.module.scss";
import { useSlateStatic } from "slate-react";
import { useRecoilStateLoadable } from "recoil";
import { commentThreadsState } from "../../utils";
import { Text } from "slate";
import { Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

type Props = {
  textNode: Text;
  children: React.ReactNode;
  threadId: string;
};

const DURATION_PREVENT_CLOSE_MODAL = 200;

export default function CommentedText({ textNode, children, threadId }: Props) {
  const [commentLoadable, setComment] = useRecoilStateLoadable<string | null>(
    commentThreadsState(threadId)
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const [openPopover, setOpenPopover] = React.useState(true);
  const [allowCloseModal, setAllowCloseModal] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(
      () => setAllowCloseModal(true),
      DURATION_PREVENT_CLOSE_MODAL
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <Popover
      open={openPopover}
      onOpenChange={(value) => {
        if (allowCloseModal) setOpenPopover(value);
      }}
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
