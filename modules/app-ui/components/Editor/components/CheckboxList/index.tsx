import { Checkbox } from "antd";
import React from "react";
import { useSetRecoilState } from "recoil";
import { RenderElementProps } from "slate-react";
import { z } from "zod";

import Flex from "../../../Flex";
import { answersState } from "../../utils";

import styles from "./index.module.scss";

const Props = z.object({
  allAnswers: z.string().array(),
  numCorrectAnswers: z.number(),
  indices: z.string().array()
});

type Props = z.infer<typeof Props>;

export default function CheckboxList({
  attributes,
  children,
  element
}: RenderElementProps) {
  const { allAnswers, numCorrectAnswers, indices } = Props.parse(element);
  const [state, setState] = React.useState(
    Array.from({ length: allAnswers.length }, () => false)
  );
  const setAnswers = useSetRecoilState(answersState);
  return (
    <div className={styles.container} {...attributes}>
      {indices.map((index) => (
        <div key={index} id={index} />
      ))}
      <Flex.Col gap="12px">
        {allAnswers.map((_answer, index) => (
          <div key={index}>
            <Checkbox
              style={{ fontSize: "1em", color: "inherit" }}
              checked={state[index]}
              onChange={(e) => {
                const numChecked = state.filter((item) => item).length;
                if (
                  numChecked + (e.target.checked ? 1 : -1) <=
                  numCorrectAnswers
                ) {
                  const newState = state.map((item, id) =>
                    id === index ? e.target.checked : item
                  );
                  setState(newState);
                  const checkedAnswers = allAnswers.filter(
                    (_, index) => newState[index]
                  );
                  setAnswers((answer) => ({
                    ...answer,
                    ...Object.fromEntries(
                      indices.map((answerId, index) =>
                        index < checkedAnswers.length
                          ? [answerId, checkedAnswers[index]]
                          : [answerId, ""]
                      )
                    )
                  }));
                }
              }}
            >
              {children[index]}
            </Checkbox>
          </div>
        ))}
      </Flex.Col>
    </div>
  );
}
