import Image from "next/image";
import { RenderElementProps } from "slate-react";
import { z } from "zod";

import Flex from "../../../Flex";

import figureListening from "./assets/figure-listening.png";
import figureWriting from "./assets/figure-writing.png";
import styles from "./index.module.scss";

const Props = z.object({
  isFigureListening: z.boolean().optional()
});

export default function ImageFigure({
  attributes,
  children,
  element
}: RenderElementProps) {
  const { isFigureListening } = Props.parse(element);
  const figure = isFigureListening ? figureListening : figureWriting;
  return (
    <Flex.Row {...attributes} justifyContent="center">
      <Image
        src={figure}
        alt=""
        width={0}
        height={0}
        className={styles.image}
      />
      {children}
    </Flex.Row>
  );
}
