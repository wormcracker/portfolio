import React, { useRef } from "react";
import { useCardTilt } from "../hooks/useCardTilt.js";

function SketchyCard({
  children,
  className = "",
  rotate = 0,
  perspective = false,
  tilt = false,
}) {
  const ref = useRef(null);
  if (tilt) useCardTilt(ref);
  return (
    <div
      ref={ref}
      className={`main-section relative ${className}`}
      style={{
        transform: perspective
          ? `perspective(400px) rotateY(${rotate}deg) rotateZ(${rotate / 2}deg)`
          : `rotate(${rotate}deg)`,
        boxShadow: "0 4px 24px 0 rgba(90,90,120,0.10)",
        borderRadius: "1.2rem",
        border: "2px solid #eebbc3",
        background: "inherit",
        overflow: "hidden",
        willChange: tilt ? "transform" : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 2,
          top: 2,
          width: "calc(100% - 4px)",
          height: "calc(100% - 4px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <svg width="100%" height="100%">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="18"
            fill="none"
            stroke="#b8c1ec"
            strokeDasharray="8 6"
            strokeWidth="2"
            opacity="0.25"
          />
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default SketchyCard;