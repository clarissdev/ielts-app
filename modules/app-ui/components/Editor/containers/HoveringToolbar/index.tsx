import { Button } from "antd";
import React, { useCallback } from "react";
import { MdClear, MdHighlight, MdOutlineSpeakerNotes } from "react-icons/md";
import { Editor, Path, Range, Transforms } from "slate";
import { useFocused, useSlateStatic } from "slate-react";

import {
  useAddCommentThreadCallback,
  useRemoveCommentThreadCallback
} from "../../hooks";
import {
  COMMENT_THREAD_PREFIX,
  getCommentThreadsOnTextNode,
  getNodeEntryAtSelection,
  insertCommentThread,
  isMarkActive,
  toggleMark
} from "../../utils";

import styles from "./index.module.scss";

type Props = {
  editorOffsets: { x: number; y: number } | undefined | null;
};

export function HoveringToolbar({ editorOffsets }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const editor = useSlateStatic();
  const inFocus = useFocused();

  React.useEffect(() => {
    const handleShowToolbar = () => {
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
      if (!domSelection) {
        element?.removeAttribute("style");
        return;
      }
      const domRange = domSelection?.getRangeAt(0);
      const {
        x,
        height: nodeHeight,
        y: nodeY,
        width
      } = domRange?.getBoundingClientRect() || {};

      const nodeX = x + width / 3;

      ref.current.style.display = "flex";
      ref.current.style.top = `${
        nodeY + nodeHeight - (editorOffsets?.y || 0) + 30
      }px`;
      ref.current.style.left = `${nodeX - (editorOffsets?.x || 0)}px`;
    };
    window.addEventListener("mouseup", handleShowToolbar);
    return () => window.removeEventListener("mouseup", handleShowToolbar);
  }, [editor, editorOffsets?.x, editorOffsets?.y, inFocus]);

  const isHighlightMarkActive = isMarkActive(editor, "highlight");
  const marks = Editor.marks(editor);
  const commentThreadsOnTextNode = marks
    ? getCommentThreadsOnTextNode(marks)
    : undefined;
  const isCommentMarkActive =
    commentThreadsOnTextNode != null && commentThreadsOnTextNode.size > 0;

  const addCommentThread = useAddCommentThreadCallback();
  const removeCommentThread = useRemoveCommentThreadCallback();

  const handleInsertComment = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation();
      insertCommentThread(editor, addCommentThread);
      editor.selection = null;
      event.preventDefault();
    },
    [editor, addCommentThread]
  );

  return (
    <div className={styles.container} ref={ref}>
      {!isHighlightMarkActive ? (
        <Button
          style={{ borderRadius: "0" }}
          icon={<MdHighlight />}
          onMouseDown={(e) => {
            e.stopPropagation();
            toggleMark(editor, "highlight");

            // set selection to false to prevent highlight
            editor.selection = null;
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
                edge: "start"
              }),
              focus: Editor.point(editor, nodeEntry[1], { edge: "end" })
            });
            toggleMark(editor, "highlight");
            editor.selection = null;
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
            event.stopPropagation();
            if (!commentThreadsOnTextNode?.size) return;
            const nodeEntry = getNodeEntryAtSelection(editor);
            if (nodeEntry == null) return;
            if (!Path.isPath(nodeEntry[1])) return;
            Transforms.select(editor, {
              anchor: Editor.point(editor, nodeEntry[1], {
                edge: "start"
              }),
              focus: Editor.point(editor, nodeEntry[1], { edge: "end" })
            });
            const markToRemove =
              COMMENT_THREAD_PREFIX + Array.from(commentThreadsOnTextNode)[0];
            removeCommentThread(markToRemove);
            toggleMark(editor, markToRemove);
            editor.selection = null;
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
