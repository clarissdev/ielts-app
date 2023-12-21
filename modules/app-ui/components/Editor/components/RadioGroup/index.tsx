import { Radio } from "antd";
import cx from "clsx";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { RenderElementProps } from "slate-react";
import { z } from "zod";

import Flex from "../../../Flex";
import { FontSize, answersState, fontSizeState } from "../../utils";

import styles from "./index.module.scss";

const Props = z.object({
  allAnswers: z.string().array(),
  index: z.string(),
  hideId: z.boolean().optional()
});

const FONT_SIZE_TO_CLASS_NAME: Record<FontSize, string> = {
  standard: styles.fontStandard,
  large: styles.fontLarge,
  "extra-large": styles.fontExtraLarge
};

export default function RadioGroup({
  attributes,
  children,
  element
}: RenderElementProps) {
  const { hideId, allAnswers, index } = Props.parse(element);
  const fontSize = useRecoilValue(fontSizeState);
  const [answers, setAnswers] = useRecoilState(answersState);
  return (
    <Radio.Group
      id={hideId ? undefined : index}
      className={cx(styles.container, FONT_SIZE_TO_CLASS_NAME[fontSize])}
      {...attributes}
      value={answers[index]}
      onChange={(e) => {
        setAnswers((answers) => ({ ...answers, [index]: e.target.value }));
      }}
    >
      <Flex.Col gap="12px">
        {allAnswers.map((answer, id) => (
          <Radio
            value={answer}
            key={id}
            onClick={() => {
              if (answers[index] === answer) {
                const { [index]: _, ...rest } = answers;
                setAnswers(rest);
              }
            }}
          >
            <span style={{ fontSize: "1em" }}>{children[id]}</span>
          </Radio>
        ))}
      </Flex.Col>
    </Radio.Group>
  );
}
