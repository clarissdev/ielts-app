import Image from "next/image";
import { RenderElementProps } from "slate-react";
import { z } from "zod";

import Flex from "../../../Flex";

import styles from "./index.module.scss";

const Props = z.object({
  src: z.string()
});

export default function ImageV2({
  attributes,
  children,
  element
}: RenderElementProps) {
  const { src } = Props.parse(element);
  return (
    <Flex.Row {...attributes} justifyContent="center">
      <Image src={src} alt="" width={0} height={0} className={styles.image} />
      {children}
    </Flex.Row>
  );
}
