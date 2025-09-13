import { useState } from "react";

function SkillTag({ children, erasable, onErase, ...props }) {
  const [active, setActive] = useState(false);
  return (
    <span
      {...props}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      onClick={erasable ? onErase : undefined}
      style={{
        transition: "transform .15s",
        transform: active ? "scale(1.13) rotate(-4deg)" : "none",
        cursor: erasable ? "inherit" : "pointer",
        opacity: erasable ? 0.7 : 1,
      }}
    >
      {children}
    </span>
  );
}

export default SkillTag;
