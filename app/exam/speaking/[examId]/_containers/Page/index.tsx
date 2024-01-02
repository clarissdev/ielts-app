"use client";

import cx from "clsx";
import React from "react";

import PartOne from "./containers/PartOne";
import styles from "./index.module.scss";

import { SpeakingExam } from "@/modules/business-types";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  exam: SpeakingExam;
};

export default function Page({ className, style, exam }: Props) {
  const [currentPart, setCurrentPart] = React.useState(1);
  return (
    <div className={cx(styles.container, className)} style={style}>
      {currentPart === 1 ? (
        <PartOne
          questions={exam.tasks[0]}
          onProceedNextTask={() => setCurrentPart(2)}
        />
      ) : undefined}
    </div>
  );
}
