import React from "react";
import { useMemo } from "react";
import { Descendant, Element, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

import useEditorConfig from "./config";
import ToolBar from "./containers/Toolbar";
import { useSelection } from "./hooks";
import { HoveringToolbar } from "./containers/HoveringToolbar";
import styles from "./index.module.scss";
import { Color, FontSize, colorState, fontSizeState } from "./utils";
import cx from "clsx";
import { useRecoilValue } from "recoil";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  value: Descendant[];
  onChange?: (value: Descendant[]) => void;
  readOnly?: boolean;
};

const FONT_SIZE_TO_CLASS_NAME: Record<FontSize, string> = {
  standard: styles.fontStandard,
  large: styles.fontLarge,
  "extra-large": styles.fontExtraLarge,
};

const COLOR_TO_CLASS_NAME: Record<Color, string> = {
  standard: styles.colorStandard,
  blue: styles.colorBlue,
};

export default function Editor({
  className,
  style,
  value,
  onChange,
  readOnly,
}: Props) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const editor: ReactEditor = useMemo(
    () =>
      readOnly
        ? withReadOnly(withHistory(withInlines(withReact(createEditor()))))
        : withHistory(withInlines(withReact(createEditor()))),
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

  const editorOffsets =
    editorRef.current != null
      ? {
          x: editorRef.current.getBoundingClientRect().x,
          y: editorRef.current.getBoundingClientRect().y,
        }
      : null;
  const fontSize = useRecoilValue(fontSizeState);
  const color = useRecoilValue(colorState);
  return (
    <div
      className={cx(
        styles.container,
        className,
        FONT_SIZE_TO_CLASS_NAME[fontSize],
        COLOR_TO_CLASS_NAME[color]
      )}
      style={style}
    >
      <Slate editor={editor} initialValue={value} onChange={onChangeHandler}>
        {!readOnly ? <ToolBar /> : undefined}
        <HoveringToolbar editorOffsets={editorOffsets} />
        <div ref={editorRef}>
          <Editable {...config} />
        </div>
      </Slate>
    </div>
  );
}

const withInlines = (editor: ReactEditor) => {
  const { isInline, isSelectable } = editor;

  editor.isInline = (element: Element) =>
    ("type" in element && ["input"].includes(String(element.type))) ||
    isInline(element);

  editor.isSelectable = (element: Element) =>
    "type" in element && element.type !== "badge" && isSelectable(element);

  return editor;
};

const withReadOnly = (editor: ReactEditor) => {
  editor.insertText = () => {};
  editor.insertTextData = () => false;

  return editor;
};
