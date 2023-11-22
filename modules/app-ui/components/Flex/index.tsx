import * as React from "react";

type FlexKeys =
  | "alignContent"
  | "alignItems"
  | "alignSelf"
  | "alignTracks"
  | "boxSizing"
  | "columnGap"
  | "display"
  | "flex"
  | "flexBasis"
  | "flexDirection"
  | "flexFlow"
  | "flexGrow"
  | "flexShrink"
  | "flexWrap"
  | "gap"
  | "justifyContent"
  | "justifyItems"
  | "justifySelf"
  | "justifyTracks"
  | "maxHeight"
  | "maxWidth"
  | "minHeight"
  | "minWidth"
  | "padding"
  | "paddingBlock"
  | "paddingBlockEnd"
  | "paddingBlockStart"
  | "paddingBottom"
  | "paddingInline"
  | "paddingInlineEnd"
  | "paddingInlineStart"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "rowGap";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Pick<React.CSSProperties, FlexKeys>;

const Row = React.forwardRef<HTMLDivElement, Props>(function Row(
  { className, style, children, ...others }: Props,
  ref
) {
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "row", ...others, ...style }}
      ref={ref}
    >
      {children}
    </div>
  );
});

const Col = React.forwardRef<HTMLDivElement, Props>(function Col(
  { className, style, children, ...others }: Props,
  ref
) {
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", ...others, ...style }}
      ref={ref}
    >
      {children}
    </div>
  );
});

const Cell = React.forwardRef<HTMLDivElement, Props>(function Cell(
  { className, style, children, ...others }: Props,
  ref
) {
  return (
    <div className={className} style={{ ...others, ...style }} ref={ref}>
      {children}
    </div>
  );
});

const Flex = { Row, Col, Cell };

export default Flex;
