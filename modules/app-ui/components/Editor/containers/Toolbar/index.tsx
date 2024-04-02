import { Menu, MenuProps } from "antd";
import { useSlateStatic } from "slate-react";

import { toggleMark } from "../../utils";

import styles from "./index.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function ToolBar() {
  const editor = useSlateStatic();
  const items: MenuProps["items"] = [
    {
      key: "bold",
      label: <strong>B</strong>,
      onClick: (e) => {
        e.domEvent.preventDefault();
        toggleMark(editor, "bold");
      }
    },
    {
      key: "sub",
      label: <div>sub</div>,
      onClick: (e) => {
        e.domEvent.preventDefault();
        toggleMark(editor, "sub");
      }
    },
    {
      key: "italic",
      label: <em>I</em>,
      onClick: (e) => {
        e.domEvent.preventDefault();
        toggleMark(editor, "italic");
      }
    },
    {
      key: "underline",
      label: <u>U</u>,
      onClick: (e) => {
        e.domEvent.preventDefault();
        toggleMark(editor, "underline");
      }
    },
    {
      key: "highlight",
      label: "highlight",
      onClick: (e) => {
        e.domEvent.preventDefault();
        toggleMark(editor, "highlight");
      }
    }
  ];
  return (
    <Menu className={styles.container} items={items} mode="horizontal"></Menu>
  );
}
