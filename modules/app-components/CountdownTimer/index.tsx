import * as React from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  duration: number;
  unstyled: true;
  as: "div" | "span";
};

const MILLISECONDS_PER_MINUTE = 60000;

export default function CountdownTimer({
  className,
  style,
  duration,
  as,
}: Props) {
  const [millisecondsLeft, setMillisecondsLeft] =
    React.useState<number>(duration);
  const numMinutes = Math.floor(millisecondsLeft / MILLISECONDS_PER_MINUTE);

  const Component = as;
  React.useEffect(() => {
    const refresh = () =>
      setMillisecondsLeft((millisecondsLeft) => millisecondsLeft - 1000);
    refresh();
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Component className={className} style={style}>
      {`${numMinutes}m`}
    </Component>
  );
}
