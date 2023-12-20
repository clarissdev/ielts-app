import { Radio } from "antd";
import cx from "clsx";
import React from "react";
import { useRecoilValue } from "recoil";
import { RenderElementProps } from "slate-react";
import { z } from "zod";

import Flex from "../../../Flex";
import { FontSize, fontSizeState } from "../../utils";

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
  const fontSize = useRecoilValue(fontSizeState);
  const [selectedValue, setSelectedValue] = React.useState("");
  return (
    <div>
      <input id={index} style={{ display: "none" }} value={selectedValue} />
      <Radio.Group
        className={cx(styles.container, FONT_SIZE_TO_CLASS_NAME[fontSize])}
        {...attributes}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
        }}
      >
        <Flex.Col gap="12px">
          {allAnswers.map((answer, id) => (
            <Radio
              value={answer}
              key={id}
              onClick={() => {
                if (selectedValue === answer) {
                  setSelectedValue("");
                }
              }}
            >
              <span style={{ fontSize: "1em" }}>{children[id]}</span>
            </Radio>
          ))}
        </Flex.Col>
      </Radio.Group>
    </div>
  );
}
