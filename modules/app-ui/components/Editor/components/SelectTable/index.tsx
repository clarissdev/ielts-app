import { IoCheckmark } from "react-icons/io5";
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
          <tr key={id} id={id}>
            <td>{children[index]}</td>

            {options.map((item) => (
              <td key={item}>
                <button
                  className={styles.buttonCheck}
                  onClick={() => {
                    if (answers[id] !== item) {
                      setAnswers((answers) => ({ ...answers, [id]: item }));
                    }
                  }}
                >
                  {answers[id] === item ? <IoCheckmark /> : undefined}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
