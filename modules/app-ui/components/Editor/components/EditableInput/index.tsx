import { Input } from "antd";
import cx from "clsx";
import { useRecoilState } from "recoil";
import { RenderElementProps } from "slate-react";
import { z } from "zod";

import { answersState } from "../../utils";

import styles from "./index.module.scss";

const Props = z.object({
  placeholder: z.string().optional(),
  index: z.string(),
  partial: z.boolean().optional(),
  partialFor: z.string().optional(),
  partialIndex: z.number().optional(),
  hidden: z.boolean().optional()
});

export default function EditableInput({
  attributes,
  children,
  element
}: RenderElementProps) {
  const { index, placeholder, partial, partialFor, partialIndex, hidden } =
    Props.parse(element);
  const [answers, setAnswers] = useRecoilState(answersState);
  return (
    <span contentEditable={false} {...attributes}>
      <Input
        id={index}
        className={cx(styles.input, hidden ? styles.hidden : undefined)}
        value={
          partialIndex != null
            ? (answers[index] || "").split(", ")[partialIndex]
            : answers[index]
        }
        placeholder={placeholder}
        onChange={(e) => {
          if (e.target.value.includes(",")) return;
          if (partial != null && partialFor != null && partialIndex != null) {
            // At this moment, we only allow at most two input at the same position
            let splitedAnswers = (answers[partialFor] || "").split(", ");
            if (splitedAnswers.length === 1)
              splitedAnswers = [...splitedAnswers, ""];
            splitedAnswers[partialIndex] = e.target.value;
            setAnswers((answers) => ({
              ...answers,
              [partialFor]: splitedAnswers.join(", ")
            }));
          } else {
            setAnswers((answers) => ({ ...answers, [index]: e.target.value }));
          }
        }}
      />
      {children}
    </span>
  );
}
