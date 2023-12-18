import { Select } from "antd";
import React from "react";
import { RenderElementProps } from "slate-react";
import { z } from "zod";
import styles from "./index.module.scss";
import Flex from "../../../Flex";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Color, answersState, colorState } from "../../utils";
import cx from "clsx";

const Props = z.object({
  items: z.string().array(),
  index: z.string(),
});

type Props = z.infer<typeof Props>;

const COLOR_TO_CLASS_NAME: Record<Color, string> = {
  standard: styles.colorStandard,
  blue: styles.colorBlue,
};

export default function SelectItem({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const { items, index } = Props.parse(element);

  const setAnswers = useSetRecoilState(answersState);

  const handleChange = (value: string) => {
    setAnswers((answers) => ({ ...answers, [index]: value }));
  };

  const color = useRecoilValue(colorState);

  return (
    <div {...attributes} className={styles.container} id={index}>
      <Flex.Row alignItems="center" gap="8px">
        <Select
          className={styles.select}
          onChange={handleChange}
          options={items.map((item) => ({
            value: item,
            label: (
              <span
                style={{ fontWeight: "600" }}
                className={COLOR_TO_CLASS_NAME[color]}
              >
                {item}
              </span>
            ),
          }))}
        />
        {children}
      </Flex.Row>
    </div>
  );
}
