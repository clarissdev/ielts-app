import cx from "clsx";
import React from "react";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  Editor as SlateEditor,
  Descendant,
  Element,
  Range,
  createEditor
} from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

import useEditorConfig from "./config";
import { HoveringToolbar } from "./containers/HoveringToolbar";
import ToolBar from "./containers/Toolbar";
import { useSelection } from "./hooks";
import styles from "./index.module.scss";
import { Color, FontSize, colorState, fontSizeState } from "./utils";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  value: Descendant[];
  onChange?: (value: Descendant[]) => void;
  disableEditing?: boolean;
  readOnly?: boolean;
};

const FONT_SIZE_TO_CLASS_NAME: Record<FontSize, string> = {
  standard: styles.fontStandard,
  large: styles.fontLarge,
  "extra-large": styles.fontExtraLarge
};

const COLOR_TO_CLASS_NAME: Record<Color, string> = {
  standard: styles.colorStandard,
  blue: styles.colorBlue
};

export default function Editor({
  className,
  style,
  value,
  onChange,
  disableEditing,
  readOnly
}: Props) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const editor: ReactEditor = useMemo(
    () =>
      disableEditing
        ? withDisableEditing(
            withHistory(withInlines(withReact(createEditor())))
          )
        : withHistory(withInlines(withReact(createEditor()))),
    [disableEditing]
  );
  const config = useEditorConfig(editor, {
    disableEditing: disableEditing || false
  });
  const [_selection, setSelection] = useSelection(editor);

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
          y: editorRef.current.getBoundingClientRect().y
        }
      : null;
  const fontSize = useRecoilValue(fontSizeState);
  const color = useRecoilValue(colorState);

  const { selection } = editor;
  const shouldShowToolbar =
    selection &&
    !Range.isCollapsed(selection) &&
    SlateEditor.string(editor, selection) !== "";

  const [mustShowToolbar, setMustShowToolbar] = React.useState(false);

  React.useEffect(() => {
    if (!shouldShowToolbar) {
      setMustShowToolbar(false);
    }
  }, [shouldShowToolbar]);

  React.useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setMustShowToolbar(true);
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {!disableEditing ? <ToolBar /> : undefined}
        {mustShowToolbar ? (
          <HoveringToolbar editorOffsets={editorOffsets} />
        ) : undefined}
        <div ref={editorRef}>
          <Editable
            {...config}
            readOnly={readOnly}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...({ spellCheck: "false" } as any)}
          />
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

const withDisableEditing = (editor: ReactEditor) => {
  editor.insertText = () => {};
  editor.insertTextData = () => false;

  return editor;
};
