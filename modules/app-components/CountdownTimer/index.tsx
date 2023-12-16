import moment from "moment";
import * as React from "react";

import { getCountdownDetailsFromMillisecondsLeft } from "./utils";
import { EM_DASH } from "@/modules/common-utils/unicode";

type UnixTimestampInMilliseconds = number;

type Props = {
  className?: string;
  style?: React.CSSProperties;
  expiredAt: UnixTimestampInMilliseconds | null | undefined;
  unstyled: true;
  as: "div" | "span";
};

export default function CountdownTimer({
  className,
  style,
  expiredAt,
  as,
}: Props) {
  const [millisecondsLeft, setMillisecondsLeft] = React.useState<number | null>(
    null
  );
  const countdownDetails =
    millisecondsLeft != null
      ? getCountdownDetailsFromMillisecondsLeft(millisecondsLeft)
      : null;
  const Component = as;
  React.useEffect(() => {
    const refresh = () =>
      setMillisecondsLeft(
        expiredAt != null ? Math.max(expiredAt - Date.now(), 0) : null
      );
    refresh();
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, [expiredAt]);
  return (
    <Component className={className} style={style}>
      {countdownDetails
        ? `${countdownDetails.numMinutes}m : ${countdownDetails.numSeconds}s`
        : EM_DASH}
    </Component>
  );
}
