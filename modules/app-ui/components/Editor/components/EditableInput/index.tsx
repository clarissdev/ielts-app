import { Input } from "antd";
import { useRecoilState } from "recoil";
import { RenderElementProps } from "slate-react";
import { z } from "zod";
import { answersState } from "../../utils";

const Props = z.object({
  placeholder: z.string().optional(),
  index: z.string(),
});

export default function EditableInput({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const { index, placeholder } = Props.parse(element);
  const [answers, setAnswers] = useRecoilState(answersState);
  return (
    <span contentEditable={false} {...attributes}>
      <Input
        id={index}
        style={{ display: "inline", maxWidth: "200px" }}
        value={answers[index] || ""}
        placeholder={placeholder}
        onChange={(e) =>
          setAnswers((answers) => ({ ...answers, [index]: e.target.value }))
        }
      />
      {children}
    </span>
  );
}
