import React from "react";
import { ReactEditor } from "slate-react";
import { Text } from "slate";
import {
  activeCommentThreadIdAtom,
  commentThreadsState,
  getNodeEntryAtSelection,
} from "../../utils";
import styles from "./index.module.scss";
import {
  useRecoilStateLoadable,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import Flex from "../../../Flex";
import { ImCross } from "react-icons/im";

type Props = {
  editor: ReactEditor;
  editorOffsets: { x: number; y: number } | undefined | null;
  threadId: string;
};

export default function CommentThreadPopover({
  editor,
  editorOffsets,
  threadId,
}: Props) {
  const nodeEntry = getNodeEntryAtSelection(editor);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const textNode =
    nodeEntry != null && Text.isText(nodeEntry[0]) ? nodeEntry[0] : null;

  const activeCommentThreadId = useRecoilValue(activeCommentThreadIdAtom);
  const setActiveCommentThreadId = useSetRecoilState(activeCommentThreadIdAtom);

  React.useEffect(() => {
    const editorEl = popoverRef.current;
    if (editorEl == null || textNode == null) {
      return;
    }

    const domNode = ReactEditor.toDOMNode(editor, textNode);
    const {
      x: nodeX,
      height: nodeHeight,
      y: nodeY,
    } = domNode.getBoundingClientRect();

    editorEl.style.display = "block";
    editorEl.style.top = `${nodeY + nodeHeight - (editorOffsets?.y || 0)}px`;
    editorEl.style.left = `${nodeX - (editorOffsets?.x || 0)}px`;
  }, [editor, editorOffsets?.x, editorOffsets?.y, textNode]);

  const [commentLoadable, setComment] = useRecoilStateLoadable<string | null>(
    commentThreadsState(threadId)
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        popoverRef.current != null &&
        !popoverRef.current.contains(event.target) &&
        activeCommentThreadId != null
      ) {
        setActiveCommentThreadId(null);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={popoverRef}>
      <Flex.Row justifyContent="end">
        <button
          style={{ backgroundColor: "#ad4933" }}
          onClick={() => setActiveCommentThreadId(null)}
        >
          <ImCross size="8px" />
        </button>
      </Flex.Row>
      <textarea
        value={commentLoadable.contents || ""}
        onChange={onChange}
      ></textarea>
    </div>
  );
}
