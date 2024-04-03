import { RenderElementProps } from "slate-react";
import styles from "./index.module.scss";

export default function Fraction({ attributes, children }: RenderElementProps) {
  if (children.length !== 2) {
    throw Error("Invalid length");
  }

  const numerator: React.ReactNode = children[0];
  const denominator: React.ReactNode = children[1];

  return (
    <span {...attributes} className={styles.frac}>
      <span>{numerator}</span>
      <span className={styles.symbol}>/</span>
      <span className={styles.bottom}>{denominator}</span>
    </span>
  );
}
