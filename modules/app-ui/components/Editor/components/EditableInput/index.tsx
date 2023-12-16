import { RenderElementProps } from "slate-react";

export default function EditableInput({
  attributes,
  children,
}: RenderElementProps) {
  return (
    <span contentEditable={false}>
      <input style={{ display: "inline" }} {...attributes} />
      {children}
    </span>
  );
}
