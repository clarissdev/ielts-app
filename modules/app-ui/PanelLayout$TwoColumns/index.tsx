import cx from "clsx";
import React from "react";

import styles from "./index.module.scss";

export type Orientation = "portrait" | "landscape";

export type RatioResistance = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type MarginCloseness = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type RootProps = {
  className?: string;
  style?: React.CSSProperties;
  content?: React.ReactNode;
  children?: React.ReactNode;
  orientation: Orientation;
  /**
   * Expected aspect ratio (width/height). This ratio should match
   * the ratio in the UI/UX design.
   */
  targetedAspectRatio: number;
  /**
   * How much the aspect ratio is allowed to differ from `targetedAspectRatio`.
   * By default, `ratioResistance = 5`.
   *
   * The higher the value is, the more `targetedAspectRatio` is respected.
   * The lower the value is, the more tolerant the aspect ratio is allowed.
   *
   * Mathematically, the final aspect ratio must be from `L` to `R` where:
   * - `L = targetedAspectRatio * exp(- 1 / ratioResistance)`
   * - `R = targetedAspectRatio * exp(+ 1 / ratioResistance)`
   *
   * In particular,
   * - If `ratioResistance = Infinity`, the final aspect ratio
   * must be equal to `targetedAspectRatio`.
   * - If `ratioResistance = 1`, the final aspect ratio must be
   * from `targetedAspectRatio / e` to `targetedAspectRatio * e`
   * where `e = 2.718281828459045`.
   */
  ratioResistance?: RatioResistance;
  /**
   * How much the container height nears to 100vh.
   * By default, `marginCloseness = 5`.
   *
   * A higher value of `marginCloseness` causes the container height to
   * be nearer to 100vh.
   *
   * Mathematically, the container height is set to:
   * `Math.exp(-1 / marginCloseness) * 100vh`.
   *
   * Note that `ratioResistance` has higher priority than `marginCloseness`.
   */
  marginCloseness?: MarginCloseness;
  /**
   * Defines `flex-grow`, `flex-shrink`, and `flex-basis` of the left column.
   * For example, if `leftNumShares = 4`, `rightNumShares = 6`, then
   * the left column gets 40% width and the right column gets 60% width.
   */
  leftNumShares: number;
  /**
   * Defines `flex-grow`, `flex-shrink`, and `flex-basis` of the right column.
   * For example, if `leftNumShares = 4`, `rightNumShares = 6`, then
   * the left column gets 40% width and the right column gets 60% width.
   */
  rightNumShares: number;
};

/**
 * Display two columns (or rows) elegantly while balancing between
 * aspect ratio and viewport height
 */
function Root({
  className,
  style,
  content,
  children = content,
  orientation,
  targetedAspectRatio,
  ratioResistance = 5,
  marginCloseness = 5,
  leftNumShares = 1,
  rightNumShares = 1,
}: RootProps) {
  const fixedAspectRatio =
    orientation === "landscape"
      ? Math.max(targetedAspectRatio, 1 / targetedAspectRatio)
      : Math.min(targetedAspectRatio, 1 / targetedAspectRatio);

  return (
    <div
      className={cx(styles.root, className)}
      style={Object.assign(
        { ...style },
        {
          "--min-height-per-100pc":
            (1 / fixedAspectRatio) * Math.exp(-1 / ratioResistance),
          "--optimal-height-per-100vh": Math.exp(-1 / marginCloseness),
          "--max-height-per-100pc":
            (1 / fixedAspectRatio) * Math.exp(+1 / ratioResistance),
          "--left-ratio": leftNumShares / (leftNumShares + rightNumShares),
          "--right-ratio": rightNumShares / (leftNumShares + rightNumShares),
        }
      )}
    >
      <div
        className={styles.rootContent}
        {...{ "data-orientation": orientation }}
      >
        {children}
      </div>
    </div>
  );
}

type LeftProps = {
  className?: string;
  style?: React.CSSProperties;
  content?: React.ReactNode;
  children?: React.ReactNode;
};

function Left({ className, style, content, children = content }: LeftProps) {
  return (
    <div className={cx(styles.left, className)} style={style}>
      {children}
    </div>
  );
}

type RightProps = {
  className?: string;
  style?: React.CSSProperties;
  content?: React.ReactNode;
  children?: React.ReactNode;
};

function Right({ className, style, content, children = content }: RightProps) {
  return (
    <div className={cx(styles.right, className)} style={style}>
      {children}
    </div>
  );
}

const PanelLayout$TwoColumns = Object.assign(Root, { Root, Left, Right });

export default PanelLayout$TwoColumns;
