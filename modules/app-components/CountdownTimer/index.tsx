import * as React from "react";

import { getCountdownDetailsFromMillisecondsLeft } from "./utils";
import { EM_DASH } from "@/modules/common-utils/unicode";

type Props = {
  className?: string;
  style?: React.CSSProperties; // milliseconds
  duration: number;
  unstyled: true;
  as: "div" | "span";
  onExpired?: () => void;
  start: boolean;
};

const NUM_MILLISECONDS_PER_SECOND = 1000;

export default function CountdownTimer({
  className,
  style,
  duration,
  as,
  start,
  onExpired,
}: Props) {
  const [millisecondsLeft, setMillisecondsLeft] =
    React.useState<number>(duration);
  const countdownDetails =
    millisecondsLeft != null
      ? getCountdownDetailsFromMillisecondsLeft(millisecondsLeft)
      : null;
  const Component = as;

  React.useEffect(() => {
    const refresh = () => {
      const updatedNumMillisecondsLeft = Math.max(
        millisecondsLeft - NUM_MILLISECONDS_PER_SECOND,
        0
      );
      if (millisecondsLeft !== 0 && updatedNumMillisecondsLeft === 0) {
        onExpired?.();
      }
      setMillisecondsLeft((millisecondsLeft) =>
        Math.max(millisecondsLeft - NUM_MILLISECONDS_PER_SECOND, 0)
      );
    };
    let interval: NodeJS.Timeout | undefined = undefined;
    if (start) {
      interval = setInterval(refresh, NUM_MILLISECONDS_PER_SECOND);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);
  return (
    <Component className={className} style={style}>
      {countdownDetails ? `${countdownDetails.numMinutes}` : EM_DASH}
    </Component>
  );
}
