import React from "react";

export function useBrowserSearchBlocking() {
  const handleBlockSearch = (e: KeyboardEvent) => {
    if ((e.metaKey && e.key === "f") || (e.ctrlKey && e.key === "f")) {
      e.preventDefault();
    }
  };
  React.useEffect(() => {
    window.addEventListener("keydown", handleBlockSearch);
    return () => {
      window.removeEventListener("keydown", handleBlockSearch);
    };
  }, [handleBlockSearch]);
}
