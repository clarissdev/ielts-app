import React, { useCallback } from "react";
import { Button } from "antd";
import { Editor, Path, Range, Transforms } from "slate";
import { useFocused, useSlateStatic } from "slate-react";

import styles from "./index.module.scss";
import { MdClear, MdHighlight, MdOutlineSpeakerNotes } from "react-icons/md";
import {
  COMMENT_THREAD_PREFIX,
  activeCommentThreadIdAtom,
  getCommentThreadsOnTextNode,
  getNodeEntryAtSelection,
  insertCommentThread,
  isMarkActive,
  toggleMark,
} from "../../utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  useAddCommentThreadCallback,
  useRemoveCommentThreadCallback,
} from "../../hooks";

export function HoveringToolbar() {
  const ref = React.useRef<HTMLDivElement>(null);
  const editor = useSlateStatic();
  const inFocus = useFocused();

  React.useEffect(() => {
    const element = ref.current;
    const { selection } = editor;

    if (!element) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      element?.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    element.style.opacity = "1";
    element.style.top = `${
      rect?.top || 0 + window.scrollY - element?.offsetHeight
    }px`;
    element.style.left = `${
      rect?.left ||
      0 + window.scrollX - element.offsetWidth / 2 + (rect?.width || 0) / 2
    }px`;
  });

  const isHighlightMarkActive = isMarkActive(editor, "highlight");
  const marks = Editor.marks(editor);
  const commentThreadsOnTextNode = marks
    ? getCommentThreadsOnTextNode(marks)
    : undefined;
  const isCommentMarkActive =
    commentThreadsOnTextNode != null && commentThreadsOnTextNode.size > 0;

  const setActiveCommentThreadId = useSetRecoilState(activeCommentThreadIdAtom);

  const addCommentThread = useAddCommentThreadCallback();
  const removeCommentThread = useRemoveCommentThreadCallback();

  const handleInsertComment = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation();
      const newCommentThreadId = insertCommentThread(editor, addCommentThread);
      setActiveCommentThreadId(newCommentThreadId);
    },
    [editor, addCommentThread]
  );

  const activeCommentThreadId = useRecoilValue(activeCommentThreadIdAtom);
  console.log(activeCommentThreadId);

  return (
    <div className={styles.container} ref={ref}>
      {!isHighlightMarkActive ? (
        <Button
          style={{ borderRadius: "0" }}
          icon={<MdHighlight />}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, "highlight");
          }}
        >
          Highlight
        </Button>
      ) : (
        <Button
          icon={<MdClear />}
          onMouseDown={() => {
            const nodeEntry = getNodeEntryAtSelection(editor);
            if (nodeEntry == null) return;
            if (!Path.isPath(nodeEntry[1])) return;
            Transforms.select(editor, {
              anchor: Editor.point(editor, nodeEntry[1], {
                edge: "start",
              }),
              focus: Editor.point(editor, nodeEntry[1], { edge: "end" }),
            });
            toggleMark(editor, "highlight");
          }}
          style={{ borderRadius: "0" }}
        >
          Clear Highlight
        </Button>
      )}
      {!isCommentMarkActive ? (
        <Button
          onMouseDown={handleInsertComment}
          icon={<MdOutlineSpeakerNotes />}
          style={{ borderRadius: "0" }}
        >
          Notes
        </Button>
      ) : (
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            if (!commentThreadsOnTextNode?.size) return;
            const nodeEntry = getNodeEntryAtSelection(editor);
            if (nodeEntry == null) return;
            if (!Path.isPath(nodeEntry[1])) return;
            Transforms.select(editor, {
              anchor: Editor.point(editor, nodeEntry[1], {
                edge: "start",
              }),
              focus: Editor.point(editor, nodeEntry[1], { edge: "end" }),
            });
            const markToRemove =
              COMMENT_THREAD_PREFIX + Array.from(commentThreadsOnTextNode)[0];
            console.log("VAI", Editor.marks(editor));
            removeCommentThread(markToRemove);
            toggleMark(editor, markToRemove);
          }}
          icon={<MdOutlineSpeakerNotes />}
          style={{ borderRadius: "0" }}
        >
          Clear Notes
        </Button>
      )}
    </div>
  );
}
