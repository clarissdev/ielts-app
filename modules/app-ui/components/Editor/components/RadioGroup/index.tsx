import { Radio } from "antd";
import cx from "clsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RenderElementProps } from "slate-react";
import { z } from "zod";

import Flex from "../../../Flex";
import { FontSize, answersState, fontSizeState } from "../../utils";

import styles from "./index.module.scss";

const Props = z.object({
  allAnswers: z.string().array(),
  index: z.string()
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
  const { allAnswers, index } = Props.parse(element);
  const setAnswers = useSetRecoilState(answersState);
  const answers = useRecoilValue(answersState);
  const fontSize = useRecoilValue(fontSizeState);
  return (
    <Radio.Group
      className={cx(styles.container, FONT_SIZE_TO_CLASS_NAME[fontSize])}
      id={index}
      {...attributes}
      onChange={(e) =>
        setAnswers((answers) => ({ ...answers, [index]: e.target.value }))
      }
    >
      <Flex.Col gap="12px">
        {allAnswers.map((answer, index) => (
          <Radio value={answer} key={index}>
            <span style={{ fontSize: "1em !important" }}>
              {children[index]}
            </span>
          </Radio>
        ))}
      </Flex.Col>
    </Radio.Group>
  );
}
