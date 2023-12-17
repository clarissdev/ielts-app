import { Select } from "antd";
import React from "react";
import { RenderElementProps } from "slate-react";
import { z } from "zod";
import styles from "./index.module.scss";
import Flex from "../../../Flex";
import { useSetRecoilState } from "recoil";
import { answersState } from "../../utils";

const Props = z.object({
  items: z.string().array(),
  index: z.string(),
});

type Props = z.infer<typeof Props>;

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

  return (
    <div {...attributes} className={styles.container} id={index}>
      <Flex.Row alignItems="center" gap="8px">
        <Select
          onChange={handleChange}
          options={items.map((item) => ({ value: item, label: item }))}
        />
        {children}
      </Flex.Row>
    </div>
  );
}
