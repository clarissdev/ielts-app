import { Radio } from "antd";
import { useRecoilState } from "recoil";
import { RenderElementProps } from "slate-react";
import { z } from "zod";

import { answersState } from "../../utils";

import styles from "./index.module.scss";

const Props = z.object({
  options: z.string().array(),
  indices: z.string().array()
});

export default function SelectTable({
  attributes,
  children,
  element
}: RenderElementProps) {
  const { options, indices } = Props.parse(element);
  const [answers, setAnswers] = useRecoilState(answersState);
  return (
    <table {...attributes} className={styles.container}>
      <thead>
        <tr>
          <th></th>
          {options.map((item) => (
            <th key={item}>{` ${item} `}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {indices.map((id, index) => (
          <tr key={id}>
            <td>{children[index]}</td>

            {options.map((item) => (
              <td key={item} style={{ textAlign: "center" }}>
                <Radio
                  checked={answers[id] === item}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAnswers((answers) => ({
                        ...answers,
                        [id]: item
                      }));
                    }
                  }}
                ></Radio>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
