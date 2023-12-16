import React from "react";
import { useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

import useEditorConfig from "./config";
import ToolBar from "./containers/Toolbar";
import { useSelection } from "./hooks";
import { HoveringToolbar } from "./containers/HoveringToolbar";
import { activeCommentThreadIdAtom, getNodeEntryAtSelection } from "./utils";
import { useRecoilValue } from "recoil";
import CommentThreadPopover from "./containers/CommentThreadPopover";

type Props = {
  value: Descendant[];
  onChange?: (value: Descendant[]) => void;
  readOnly?: boolean;
};

export default function Editor({ value, onChange, readOnly }: Props) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const editor: ReactEditor = useMemo(
    () =>
      readOnly
        ? withReadOnly(withHistory(withReact(createEditor())))
        : withHistory(withReact(createEditor())),
    []
  );
  const config = useEditorConfig(editor, { readOnly: readOnly || false });
  const [selection, setSelection] = useSelection(editor);

  const onChangeHandler = React.useCallback(
    (document: Descendant[]) => {
      onChange?.(document);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );

  const activeCommentThreadId = useRecoilValue(activeCommentThreadIdAtom);

  const editorOffsets =
    editorRef.current != null
      ? {
          x: editorRef.current.getBoundingClientRect().x,
          y: editorRef.current.getBoundingClientRect().y,
        }
      : null;

  return (
    <Slate editor={editor} initialValue={value} onChange={onChangeHandler}>
      {!readOnly ? <ToolBar /> : <HoveringToolbar />}
      <div ref={editorRef}>
        <Editable {...config} />
        {activeCommentThreadId != null ? (
          <CommentThreadPopover
            editor={editor}
            editorOffsets={editorOffsets}
            threadId={activeCommentThreadId}
          />
        ) : null}
      </div>
    </Slate>
  );
}

const withReadOnly = (editor: ReactEditor) => {
  editor.insertText = () => {};
  editor.insertTextData = () => false;

  return editor;
};
