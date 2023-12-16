import React from "react";

import { Orientation } from "../";

export function useRunOnceOnMount(computation: () => void) {
  const triggeredRef = React.useRef(false);

  React.useEffect(() => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    computation();
  });
}

export function useOrientation({
  breakpoint,
  initialValue,
}: {
  breakpoint: number;
  initialValue: Orientation;
}): Orientation {
  const [orientation, setOrientation] =
    React.useState<Orientation>(initialValue);

  React.useEffect(() => {
    const handleResize = () => {
      const newOrientation: Orientation =
        window.innerWidth >= breakpoint ? "landscape" : "portrait";
      if (newOrientation !== orientation) {
        setOrientation(newOrientation);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [orientation, breakpoint]);

  useRunOnceOnMount(() => {
    setOrientation(window.innerWidth >= breakpoint ? "landscape" : "portrait");
  });

  return orientation;
}
