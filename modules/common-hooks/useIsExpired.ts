import * as React from "react";

type UnixTimestampInMilliseconds = number;

const INTERVAL = 10000;

export function useIsExpired(
  expiredAt: UnixTimestampInMilliseconds | null | undefined
) {
  const [isExpired, setIsExpired] = React.useState<boolean | undefined>(() => {
    if (expiredAt == null) return undefined;
    return Date.now() >= expiredAt;
  });

  React.useEffect(() => {
    const testAndSet = (newIsExpired: boolean) => {
      // make sure we only trigger `setIsExpired` when necessary
      if (isExpired !== newIsExpired) {
        setIsExpired(newIsExpired);
      }
    };

    const refresh = () => {
      if (expiredAt == null) return;
      const now = Date.now();

      if (now >= expiredAt) {
        testAndSet(true);
      } else if (now + INTERVAL >= expiredAt) {
        setTimeout(() => testAndSet(true), expiredAt - now);
      } else {
        testAndSet(false);
      }
    };

    refresh();
    const id = setInterval(refresh, INTERVAL);
    return () => clearInterval(id);
  }, [expiredAt, isExpired]);

  return isExpired;
}
