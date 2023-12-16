import cx from "clsx";
import React from "react";

import styles from "./index.module.scss";
import useBodyClasses from "@/modules/common-hooks/useBodyClasses";

type Props$Root = {
  className?: string;
  style?: React.CSSProperties;
  topAdornment?: React.ReactNode;
  bottomAdornment?: React.ReactNode;

  content?: React.ReactNode;
  children?: React.ReactNode;
};

export function Root({
  className,
  style,
  topAdornment,
  bottomAdornment,

  content,
  children = content,
}: Props$Root) {
  useBodyClasses([styles.body]);

  return (
    <article className={cx(styles.root, className)} style={style}>
      {topAdornment}
      <div className={styles.content}>{children}</div>
      {bottomAdornment}
    </article>
  );
}

type Props$Left = {
  className?: string;
  style?: React.CSSProperties;
  content?: React.ReactNode;
  children?: React.ReactNode;
};

export function Left({
  className,
  style,
  content,
  children = content,
}: Props$Left) {
  return (
    <section className={cx(styles.left, className)} style={style}>
      {children}
    </section>
  );
}

type Props$Right = {
  className?: string;
  style?: React.CSSProperties;
  content?: React.ReactNode;
  children?: React.ReactNode;
};

export function Right({
  className,
  style,
  content,
  children = content,
}: Props$Right) {
  return (
    <section className={cx(styles.right, className)} style={style}>
      {children}
    </section>
  );
}

const PageLayout$TwoColumns = Object.assign(Root, { Root, Left, Right });

export default PageLayout$TwoColumns;
