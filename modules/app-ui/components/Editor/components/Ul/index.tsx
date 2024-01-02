import { RenderElementProps } from "slate-react";

export default function SelectTable({
  attributes,
  children
}: RenderElementProps) {
  return (
    <ul {...attributes}>
      {(children as React.ReactNode[]).map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
