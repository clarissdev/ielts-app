import { RenderElementProps } from "slate-react";
import { z } from "zod";

const Props = z.object({
  options: z.string().array()
});

export default function SelectTable({
  attributes,
  children,
  element
}: RenderElementProps) {
  return <div></div>;
}
