import { useEffect } from "react";

export function usePencilCursor(eraserActive) {
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouch && !eraserActive) {
      document.body.classList.add("pencil-cursor");
    } else {
      document.body.classList.remove("pencil-cursor");
    }
    return () => document.body.classList.remove("pencil-cursor");
  }, [eraserActive]);
}
