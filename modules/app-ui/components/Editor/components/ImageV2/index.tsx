import Image from "next/image";
import { RenderElementProps } from "slate-react";
import { z } from "zod";

import Flex from "../../../Flex";

import styles from "./index.module.scss";

const Props = z.object({
  src: z.string(),
  width: z.number().optional().default(400),
  height: z.number().optional().default(400)
});

export default function ImageV2({
  attributes,
  children,
  element
}: RenderElementProps) {
  const { src, width, height } = Props.parse(element);
  return (
    <Flex.Row {...attributes} justifyContent="center">
      <Image
        priority
        src={src}
        alt=""
        width={width}
        height={height}
        className={styles.image}
      />
      {children}
    </Flex.Row>
  );
}
