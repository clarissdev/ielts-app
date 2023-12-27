import { Editor } from "slate";
import {
  DefaultElement,
  RenderElementProps,
  RenderLeafProps
} from "slate-react";

import CheckboxList from "./components/CheckboxList";
import CollapseGroup from "./components/CollapseGroup";
import CommentedText from "./components/CommentedText";
import EditableInput from "./components/EditableInput";
import RadioGroup from "./components/RadioGroup";
import SelectTable from "./components/SelectTable";
import { getCommentThreadsOnTextNode } from "./utils";

type Config = {
  readOnly: boolean;
};

export default function useEditorConfig(editor: Editor, { readOnly }: Config) {
  const renderElement = (props: RenderElementProps) => {
    const { element, children, attributes } = props;

    if (!("type" in element)) {
      return <DefaultElement {...props} />;
    }
    switch (element.type) {
      case "paragraph":
        return (
          <p
            {...attributes}
            id={"id" in element ? String(element.id) : undefined}
          >
            {children}
          </p>
        );
      case "div":
        return (
          <div
            {...attributes}
            tabIndex={0}
            style={
              "hidden" in element && element.hidden
                ? { height: "0px" }
                : undefined
            }
            id={"index" in element ? String(element.index) : undefined}
          >
            {children}
          </div>
        );
      case "h1":
        return <h1 {...attributes}>{children}</h1>;
      case "h2":
        return <h2 {...attributes}>{children}</h2>;
      case "h3":
        return <h3 {...attributes}>{children}</h3>;
      case "h4":
        return <h4 {...attributes}>{children}</h4>;
      case "input":
        return <EditableInput {...props} />;
      case "checkbox":
        return <CheckboxList {...props} />;
      case "table":
        return <SelectTable {...props} />;
      case "radio":
        return <RadioGroup {...props} />;
      case "collapse-group":
        return <CollapseGroup {...props} />;
      default:
        // For the default case, we delegate to Slate's default rendering.
        return <DefaultElement {...props} />;
    }
  };

  const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if ("bold" in leaf && leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if ("italic" in leaf && leaf.italic) {
      children = <em>{children}</em>;
    }

    if ("underline" in leaf && leaf.underline) {
      children = <u>{children}</u>;
    }

    if ("highlight" in leaf && leaf.highlight) {
      children = <span style={{ backgroundColor: "#ffff7b" }}>{children}</span>;
    }

    const threadIds = getCommentThreadsOnTextNode(leaf);

    if (threadIds.size > 0) {
      children = (
        <CommentedText
          threadId={threadIds.values().next().value}
          textNode={leaf}
        >
          {children}
        </CommentedText>
      );
    }

    return (
      <span
        style={readOnly ? { caretColor: "transparent" } : undefined}
        {...attributes}
      >
        {children}
      </span>
    );
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly) {
      event.preventDefault();
    }
  };

  return { renderElement, renderLeaf, onKeyDown };
}
