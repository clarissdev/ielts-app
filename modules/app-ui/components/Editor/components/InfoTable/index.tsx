import { z } from "zod";
import { RenderElementProps } from "slate-react";

import styles from "./index.module.scss";

function Main({ attributes, children }: RenderElementProps) {
  return (
    <table {...attributes} className={styles.container}>
      {children}
    </table>
  );
}

function Head({ attributes, children }: RenderElementProps) {
  return <thead {...attributes}>{children}</thead>;
}

function Body({ attributes, children }: RenderElementProps) {
  return <tbody {...attributes}>{children}</tbody>;
}

const TProps = z.object({
  colSpan: z.number().optional(),
  rowSpan: z.number().optional()
});

function Tr({ attributes, children }: RenderElementProps) {
  return <tr {...attributes}>{children}</tr>;
}

function Th({ attributes, children, element }: RenderElementProps) {
  const thProps = TProps.parse(element);
  return (
    <th {...attributes} {...thProps}>
      {children}
    </th>
  );
}

function Td({ attributes, children, element }: RenderElementProps) {
  const tdProps = TProps.parse(element);
  return (
    <td {...attributes} {...tdProps}>
      {children}
    </td>
  );
}

const InfoTable = Object.assign(Main, { Head, Body, Td, Th, Tr });
export default InfoTable;
