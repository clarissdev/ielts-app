import styles from "./index.module.scss";
import { useSlateStatic } from "slate-react";
import { useSetRecoilState } from "recoil";
import {
  activeCommentThreadIdAtom,
  getSmallestCommentThreadAtTextNode,
} from "../../utils";
import { Text } from "slate";

type Props = {
  // commentThreads: string;
  textNode: Text;
  children: React.ReactNode;
  "data-slate-leaf": true;
};

export default function CommentedText({
  // commentThreads,
  textNode,
  children,
  ...otherProps
}: Props) {
  const editor = useSlateStatic();
  const setActiveCommentThreadId = useSetRecoilState(activeCommentThreadIdAtom);

  const onClick = () => {
    setActiveCommentThreadId(
      getSmallestCommentThreadAtTextNode(editor, textNode)
    );
  };

  return (
    <span {...otherProps} className={styles.isActive} onClick={onClick}>
      {children}
    </span>
  );
}
