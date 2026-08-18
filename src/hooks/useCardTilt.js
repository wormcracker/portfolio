import { useEffect } from "react";

export function useCardTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Crisp rendering: keep the element on its own GPU layer with a
    // sane perspective depth so rotation doesn't force sub-pixel blur.
    el.style.backfaceVisibility = "hidden";
    el.style.WebkitBackfaceVisibility = "hidden";
    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    let rect = null;
    let ticking = false;

    function setTransform(x, y) {
      const rotateX = ((y - rect.height / 2) / rect.height) * 6;
      const rotateY = ((x - rect.width / 2) / rect.width) * -6;
      el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1) translateZ(0)`;
    }

    function reset() {
      el.style.transform = "translateZ(0)";
    }

    function onMouseMove(e) {
      if (!rect) rect = el.getBoundingClientRect();
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setTransform(e.clientX - rect.left, e.clientY - rect.top);
          ticking = false;
        });
        ticking = true;
      }
    }

    function onMouseLeave() {
      reset();
    }

    function onTouchStart(e) {
      rect = el.getBoundingClientRect();
      if (e.touches.length) {
        setTransform(
          e.touches[0].clientX - rect.left,
          e.touches[0].clientY - rect.top,
        );
      }
    }
    function onTouchEnd() {
      reset();
    }

    reset();

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [ref]);
}
